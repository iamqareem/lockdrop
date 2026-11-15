---
id: nginx-practical-02
title: "nginx · A Practical Guide — Load Balancers usually operate at either Layer 7 (Application…"
slug: nginx-practical-02-nginx-a-practical-guide-load-balancers-usually-operate-at-ei
source: "nginx — A Practical Guide to High Performance"
sourceSection: "2. Load Balancers usually operate at either Layer 7 (Application Layer, i.e, HTTP) or, 1. The amount of time to remove the server from the upstream pool when it is, 2. Keep-Alive for Load balancers"
track: web-performance
tier: premium
tags: [nginx, performance, web-server, tuning]
summary: "Layer 4 (Transport Layer, i.e, TCP) while typically you will only operate at the Covers 3 sections: Load Balancers usually operate at either Layer 7 (Application Layer, i.e, HTTP) or, The amount of time to remove the ser."
---
# nginx · A Practical Guide — Load Balancers usually operate at either Layer 7 (Application…

## 2. Load Balancers usually operate at either Layer 7 (Application Layer, i.e, HTTP) or
Layer 4 (Transport Layer, i.e, TCP) while typically you will only operate at the
Application Layer when reverse proxying a modern web application.
3. Scale is critical for load balancers— on busy sites, they will see 20x the amount of
traffic that a single application server receives. For instance, a powerful application server will only need to handle 100-200 requests per second, while a load
balancer may very well receive over 10,000 requests per second.

Handling Failure
What happens when a server goes away?
One important use case of load balancing is to handle failure, when a server crashes,
someone trips over the power cord, or it just seems to go away.
By default, when a single request to a server inside of the upstream directive fails, the
server will be removed from the pool for 10 seconds. These settings are configurable
and will be discussed later in the chapter.
At the most basic, load balancers solve two problems for us:
Load balancers help us scale. They make horizontally scaling easy, by spreading the
load across multiple backends. Instead of having a single very-powerful, veryexpensive server, we can use load balancing to share the load across 5 cheap mediumpowered instead.
Load balancers help us deal with failure. Even if you have plenty of power or only
need a single server to serve your web application, that server will eventually go
down. It will crash. The CPU will get fried. In the age of cloud computing, servers are
ephemeral and not long-lived. Load balancers allow us to be highly available by providing redundant backends.

Who load balances to load balancers?
Are you really highly available if you have multiple backend application servers but
only a single load balancer? Aren’t you back into the same position, except now the
load balancer is your single point of failure?
Yup.
You need to have multiple load balancers. But who load balancers to load balances?
The answer is DNS. When you have multiple nginx load balancers for your website,
you can use DNS load balancing to present multiple IPs for a single A Record.

Your first load balancer

79

The DNS lookup would return something like the result below:

Example 5-1. DNS Load Balancing
> dig A example.com
; <<>> DiG 9.7.3-P3 <<>> A example.com
;; QUESTION SECTION:
;example.com.
;; ANSWER SECTION:
example.com.
example.com.
example.com.

IN

287 IN
287 IN
287 IN

208.0.113.36
208.0.113.34
208.0.113.38

In the example above, there are 3 load balancers for the website example.com, each
with a different IP.
The drawback here is that although the clients are supposed to chose a random IP
from the list, poorly implemented ones will always use first IP presented. Modern
DNS providers (AWS Route 53 and Dynect come to mind) will randomize the ordering for each DNS request to help mitigate hotspots.
The other drawback is that DNS records are often cached for long periods of time. So,
if a load balancer goes away, the IP Address may still be cached for some users, even if
you remove it from your DNS entry.
Worst still, users get no indication that something is wrong, just a hard error that they
could not connect. Even with DNS TTLs as low as 60s, this is unacceptable.
Therefore, a combination of DNS Load Balancing and a mechanism to re-assign IP
Addresses is necessary to be highly-available. Depending on your provider, you can
use something like keepalived to send heartbeats between servers and takeover the IP
Address of a downed server by sending an ARP broadcast.
Traditionally, keepalived did not work on cloud providers like AWS because they usually filter broadcast traffic from the network for security. However, since version
1.2.8, keepalived supports unicast and makes a great way to build high availability
nginx configurations— even on AWS.

Before we move into more complex scenarios and examples with load balancing, let’s
deep dive into perhaps the most important tunable when using nginx as as a load balancer, upstream.
80

We learned about the basic use of upstream in Chapter 4, where we used to connect
to a single Rails or Node backend, but with load balancing, we’ll use it to represent a
group of servers.
For reference, the most basic multi-server upstream block looks something like this:
server 192.0.2.10;
server 192.0.2.11;

The servers in an upstream block can be IP addresses, hostnames, unix domain sockets, or a mix any of the above.
server 192.0.2.10:443;
server unix:/u/apps/my_app/current/tmp/unicorn.sock

Weighted Servers
Weighting alters the proportion of traffic that will be routed to a particular server in
an upstream.
Weights are useful if you want to send more traffic to particular server because it has
faster hardware, or, if you want to send less traffic to a particular server to test a
change on it.
Example 5-2. Example upstream where one server receives 3x more traffic
server app1.example.com weight=3;
server app3.example.com;

In the example above, the weight for app1.example.com is set as 3. When the weight
is not specified, as is the case for app2 & app3, it is implied to be 1.
Since app1 has a weight of 3 and app2/app3 have a weight of 1, in the example above,
app1 will have 3x more requests routed to it.

81

Example 5-3. Example upstream where one server receives half the traffic
server app1.example.com weight=2;
server app2.example.com weight=2;
server app3.example.com weight=1;

In this example, we set the weight as 2 for both app1 & app2. The weight of app3 is set
to 1. Because app3 has a lower weight, it will receive only 20% of the total traffic. This
can be used as a great way to validate configuration changes or new deployments.

Health Checks
In the open-source version of nginx, health checks don’t really exist. What you get
out of the box are passive checks— checks that will remove a server from the pool if it
causes an error a certain number of times.
The default handling is, if an incoming request to an upstream server errors out or
times out once, the server will be removed from the pool for 10s.
The pitfalls with this type of health checking is—
1. It is passively activated, it does not actively check the health of a server except
during the lifecycle of load balancing an incoming request.
2. It does not validate the response of the server. The server might be spewing out
500 errors, but as long as it responds to HTTP, nginx considers it healthy.
You can tweak the behavior of the health checks with three directives: max_fails,

fail_timeout, and proxy_next_upstream.

max_fails
Max fails controls the number of times that the server can be marked as unhealthy
before it is removed from the pool.
The conditions of what
proxy_next_upstream.

is

considered

“unhealthy”

is

determined

by

The default setting is max_fails=1 and is set per server directive within the upstream
directive.
server app1.example.com max_fails=2;
server app2.example.com max_fails=100;

fail_timeout
This directive controls the behavior of two different settings.

82

| Chapter 5: Load Balancing

## 1. The amount of time to remove the server from the upstream pool when it is
marked as unhealthy.
2. The amount of time that the max_fails count is valid for. That is to say, if
max_fails=2 and fail_timeout=10, the server needs to fail 2 times in 10 seconds
for it to be marked unhealthy.
The default setting is fail_timeout=10 (implied as seconds) and, similar to
max_fails, is set per server directive within the upstream.
server app1.example.com max_fails=2 fail_timeout=5;
server app2.example.com max_fails=100 fail_timeout=50;

proxy_next_upstream
This directive controls the error conditions that will cause an unsuccessful request
and increment the max_fails counter.
As mentioned earlier, the default setup is for nginx to only count complete failures
(an error connecting to the server or a timeout) as a failed request. That behavior is
controlled by this setting.
Below is a table all of the possible values (multiple may be set) for
proxy_next_upstream.
It’s worth noting that there are multiple uses (and settings) for this directive, but in
this section, we’ll only discuss the ones applicable to health checks.
Name

Meaning

Default?

error

An error occurred while communicating with an upstream server

timeout

A timeout occurred while communicating with an upstream server

invalid_header

A server returned an empty or invalid response

http_500

A server returned a 500 status code

http_502

A server returned a 502 status code

http_503

A server returned a 503 status code

http_504

A server returned a 504 status code

The values error, timeout, and invalid_header are set as the default for
proxy_next_upstream. In fact, these three settings are not configurable and will
always be set even if they aren’t explicitly set.
For most production setups, I find it useful to also turn on http_502, http_503, and
http_504, because they tend to be signs of an unhealthy server (typically meaning that
the web application is unresponsive or out of workers).

83

Typically, I leave http_500 off, as this isn’t always a sign of an unhealthy server and
can be tripped by a broken code path in your web application.
The proxy_next_upstream directive is specified in the location block of the load balancer configuration.
In the example below, I turn on health checks for HTTP 502, 503, and 504 status
codes. Note that even though I don’t specify error, timeout, or invalid_header that
they are enabled regardless.
proxy_next_upstream http_502 http_503 http_504;
proxy_pass http://backend;

Removing a server from the pool
Often times it is useful to remove a server from the upstream pool so that it no longer
servers web traffic.
You may want to do this if you’re testing a new configuration, performing upgrades,
or debugging a problem in production.
While you can just remove a server directive from the upstream block completely, it’s
often advantageous to explicitly mark it as down instead. When a server is marked as
down, it is considered completely unavailable and no traffic will be routed to it.
server app2.example.com down;
server app3.example.com;

In the example upstream block above, app2 is marked as permanently down and will
receive no traffic from the load balancer.
The reason that you’d use down to remove a server instead of commenting it out is to
preserve hashes when using a load balancing algorithm such as ip_hash (described
later in the chapter).

Backup Servers
It’s possible to keep a set of backup servers within your pool that will only be used
if all of the other servers in the pool go away.
To do so, simply mark the server with the backup parameter.
server app3.example.com;

84

server app4.example.com backup;

In the example above, I’ve added a new server (app4) to be used as a backup server.
Because it will only receive traffic if all of the hosts in the pool are marked as unavailable, its usefulness is limited to smaller workloads, as you’d need enough backup
servers to handle the traffic for your entire pool.

Slow Start
The server directive supports a slow_start parameter, that tells nginx to dynamically
adjust the weight over time, allowing it to ramp up and slowly begin receiving traffic
after it has become recovered or became available.
This is incredibly useful if you’re running a JIT (Just In Time) compiled language,
such as the JVM, which can take several minutes to warm up and run at optimal
speeds.
The slow_start parameter takes a time, in seconds, that it will use to ramp up the
weight of the server.
Example 5-4. Example demonstrating the slow_start directive
server app1.example.com slow_start=60s;

85

DNS Resolution in nginx Upstream Directive
There is one huge gotcha with nginx upstreams that I’ve seen a few
people get bitten by and it takes forever to debug.
The upstream directive allows you to define servers by IP
Addresses or Hostnames.
When you set a server with a hostname, how is it resolved to an
IP Address?
Well the answer is that when nginx first initializes and reads the
configuration file, it resolves the hostnames with a DNS lookup
and caches the IP Address for the lifetime of the process.
If you’re using internal hosts, that’s usually file, as the IPs don’t
often change.
However, if your upstream is an external host or one that has a frequently changing IP Address, you’re in trouble! Because nginx
caches the IP Address forever, if the IP of a hostname used in a
server directive ever changes, nginx will still use the old IP
Address.
I’ve seen this problem manifest several times, with people configuring nginx to be a reverse proxy in-front of Amazon ELB (Elastic
Load Balancer).
ELB re-maps IPs between clients very frequently, so it’s incredibly
unreliable to cache the ELB IP Address much longer than the DNS
TTL. Anyways, nginx will be configured to act as a reverse proxy
in-front of ELB and everything will work great, until the IP
Address of the ELB is re-mapped to another client and suddenly
nginx starts reverse proxying to another website! Oops!
Luckily, the fix is simple— we just need to tell nginx to obey the
DNS TTL and re-resolve the hostname.
This can be done by setting the resolve parameter on the server
directive and configuring the resolver directive.

Example 5-5. Example with dynamic DNS Resolution
resolver 8.8.8.8;
server loadbalancer.east.elb.amazonaws.com resolve;

For the resolver, you want to pass it the IP Address of a DNS server
that it can use to resolve domains. In the example, I use 8.8.8.8,
which is Google’s public DNS resolver, but it’s preferable to use a
DNS resolver or cache that’s local to your network— I recommend
dnsmasq.
86 | Chapter 5: Load Balancing

Load Balancing Methods
Out of the box, the open-source version of nginx ships with four algorithms for load
balancing traffic.

Weighted Round Robin (Default)
The round robin method is the default load balancing algorithm for nginx. It chooses
a server from the upstream list in sequential order and, once it chooses the last server
in the list, resets back to the top.
If there are weights associated with the servers, they are taken into account during the
round-robin selection and servers with a higher weight will receive proportionately
more traffic.

Least Connections
The least connections load balancing algorithm picks the server that has the least
number of active connections from nginx.
Many often choose this thinking that it’s the fairest or most balanced option, however,
often times the number of active connections is not a reliable indicator of server load.
In my experience, this method tends to cause overwhelming and spiky floods of traffic to particular servers, especially during times of failure when servers are marked
unavailable by the health check and come back online with 0 active connections.
Turn on this algorithm by specifying the least_conn directive within the upstream
context.
least_conn;

IP Hash
With round robin and least connection load balancing, when a user makes an HTTP
request and is load balanced to a particular server, they are not guaranteed to have
their request served by the same server for the future requests.
Often times this is desirable, but in some cases, you want the same users to always hit
a particular server, perhaps because of session or file locality.
This method of load balancing is often called sticky sessions— meaning that, once a
user is routed to a server, they are stuck to it and subsequent requests will be served
by the same server.

87

Honestly, I don’t recommend using sticky sessions and often it is a symptom of an
unscalable application.
The open-source version of nginx implements sticky sessions by hashing based on
the IP Address of the user. If the IP of the user changes, they will unstick, and the
server they’re routed to may change.
Turn on IP hashing by specifying the ip_hash directive within the upstream context.
ip_hash;

Because this load balancing algorithm uses a hashing function to determine the
server for a user, all sticky sessions will be remapped if you add or remove any servers
from the pool. The down parameter should be used when removing servers to preserve the session hashing.
In other words, don’t bet the farm on always having uses routed to the same server, all
of the time.

Hash
The Hash algorithm is very similar to ip_hash, except it allows to hash to a particular
server based on any arbitrary variable in nginx. For example, this can be used to hash
based on the URL or Host.
Hash was originally part of the commercial nginx plus version, but is now available in
the open-source version of nginx.
Example 5-6. Hashing based on the URI
hash $uri consistent;

In fact, you could implement ip_hash using the hash directive—
Example 5-7. Implementing IP Hash with Hash
hash $remote_addr consistent;

88

The consistent parameter tells nginx to use the ketama hashing algorithm, which is
almost always desirable, as it prevents a full hash remap when servers are added or
removed.

Sticky Sessions (Cookie Based)
Cookie based sticky sessions are available as part of the commercial nginx plus and
are covered in Chapter 10.

C10K with nginx
Using nginx as a load balancer is all about scalability. Because you typically only have
a handful of load balancers for 10s or 100s of application servers, they see a much
larger number of connections and requests per second.
With load balancers, latency and scalability is much more important and you want to
make sure that you get it right.
The “C10K Problem” is the idea of serving 10,000 simultaneous, concurrent connections through a web server.
Since nginx is incredibly scalable, with a bit of tuning (both nginx and the linux kernel), it can scale to 10,000 connections without much difficulty. In fact, it’s not
unheard of to even scale it to 100,000 or more connections.
The ability for your application to be able to handle it, though, is an entirely different
problem!

Scalable Load Balancer Configuration
Example 5-8. Scalable Load Balancer Configuration
worker_processes auto;
worker_connections 16384;
sendfile on;
tcp_nopush on;
keepalive_timeout 90;
listen *:80 backlog=2048 reuseport;
listen *:443 ssl backlog=2048 reuseport;

C10K with nginx

89

ssl_session_cache shared:SSL:20m;
ssl_session_timeout 10m;
ssl_session_tickets on;
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/nginx/cert/trustchain.crt;
resolver 8.8.8.8 8.8.4.4 valid=300s;

Tuning Linux for a Network Heavy Load
You can have the most-optimized nginx configuration, but without tuning your linux
kernel for a network heavy load, you won’t see most of the results.
This is not optional, it’s essential for high performance. The linux kernel offers some
crazy tunables that are hard for even experts to fully understand. While you can find
handfuls of sysctl settings online, it’s usually not a good idea to copy them onto your
machine blindly without fully understanding the (often complicated) implications.
The handful of settings that I’m going to share below are well understood and nonrisky. They also make up over 80% of the performance gains. I’ll also share some settings to do your own research on.
These kernel flags can be set with the sysctl tool, but will be lost upon reboot. In
order to persistent the changes across reboot, you must add them to /etc/
sysctl.conf or /etc/sysctl.d/.

Listen queue for new connections (net.core.somaxconn)
The net.core.somaxconn flag defines the size of the kernel queue for accepting new
TCP connections and most Linux distributions have it set extremely low, at 128 connections.
The listen queue defines the maximum number of new, pending connections that can
sit in the socket backlog before the kernel starts rejecting them. Clients that are rejected will see a very unhelpful Connection Refused error.
One common tell-tale sign of an undersized listen queue is the “possible SYN flooding” error log. If you see something like this in your syslog files, you need to increase
the size of your listen queue:
[73920] possible SYN flooding on port 80. Sending cookies.

90

What’s a good value to set? Well, it totally depends on the level of traffic that you’re
load balancing will be receiving, but I recommend setting it high enough to handle
the highest amount of burst traffic that you’ll be able to handle.
That is, if you have enough capacity to handle 10,000 requests per second, set it to
10,000.
You can set the value with the sysctl tool, like so:
sysctl -w net.core.somaxconn=10000

Afterwards, make sure to edit /etc/sysctl.conf and add the following line to the
file:
net.core.somaxconn=10000

nginx vs ELB vs HAProxy
Over the years, I’ve seen many debates on nginx versus other platforms. Because
nginx does so many things— it’s a web server, http router, reverse proxy, load balancer, and http cache, so it naturally competes with many other specialized pieces of
software.
The list is long, but is nginx a better choice than AWS ELB, HAProxy, Varnish, or
Apache?
The answer in my mind is a resounding yes.
In my first book on scaling, I even recommended using HAProxy as the load balancer
instead of nginx, but I’ve changed my position.
The reason is that nginx is so incredibly powerful and fast. It doesn’t come with much
bloat and will be easiest part of your infrastructure stack to scale.
Technically, on paper, HAProxy and Varnish may be 5-10% faster than nginx for load
balancing and http caching, respectively. But, you can accomplish the same things
with a much simpler nginx stack and only have to become an expert in one piece of
software. I’d trade that over a marginal gain in speed.
Many people on AWS choose to use ELB out of convenience and because it’s so cheap.
While ELB scales automagically, it’s not very robust in terms of features compared to
nginx. For example, it does not support URI-based routing, HTTP caching, or VirtualHosts.
Outside of basic setups, if doing anything serious on AWS, I highly recommend using
nginx as your http routing layer.

nginx vs ELB vs HAProxy

91

HTTP and TCP Load Balancing
So far, we’ve talked about reverse proxying and load balancing in terms of the OSI
Layer 7— the application layer. That is to say, when nginx is acting as a reverse proxy,
it’s actually parsing the HTTP request, processing the headers and body, and creating
a new HTTP request to the backend server. It fully understands the application protocol.
Layer 7 load balancing is great from a convenience stand-point. It’s easy to understand, allows you to add or modify HTTP headers, and allows you to route to custom
locations or server blocks depending on the hostname.
However, this type of load balancing also comes with some disadvantages.
- It can only be used to load balance HTTP
- SSL must terminate at the load balancer
- It’s slower due to the overhead of parsing and repacking the HTTP request
The alternative to Layer 7 load balancing is Layer 4 (TCP) load balancing, which just
forwards the raw TCP packets onwards. There is no parsing of the data, no dependences on HTTP, and SSL can pass-thru to the backend application servers transparently.
Up until April 2015, the only way to do TCP load balancing with nginx was to pay for
the commercial license or use an open-source competitor like HAProxy.
Fortunately, nginx has made TCP Load Balancing part of their open-source offering
as of nginx 1.9.0 and now everyone has access to it for free!
Performance aside, this opens up many new uses cases for nginx, such as using it to
load balance database servers or really anything that speaks TCP.
Example 5-9. Example showing TCP Load Balancing
stream {
proxy_pass backend;
server app01;
server app02;
server app03;

92

Two things worth noting— TCP load balancing introduces the stream block that’s
used instead of the http block to define TCP-based servers.
The second thing is that the proxy_pass directive is not contained inside of a location
block, it’s at the top level server block. Location blocks (and many of the other http
specific features) no longer make sense with TCP load balancing.
For instance, you can’t use proxy_set_header to inject an HTTP header. With simplicity comes faster performance but less robust features.

TCP PROXY Protocol
While most people can live with the reduced feature set of TCP load balancing for
HTTP, the major missing feature is that you can no longer access the IP Address of
the client.
That is, once the load balancer forwards the TCP packets to the backend, the packets
appear to be coming from the load balancer’s IP Address. Because you can no longer
modify the HTTP Headers to inject X-Real-Ip or overwrite Remote-Addr, you’re kind
of stuck.
Fortunately, HAProxy solved this problem by adding the Proxy Protocol to TCP,
which allows reverse proxies to inject the originating source address into the TCP
connection.
To enable this, you’ll have to make a change on both your nginx load balancer and
your reverse proxy servers.
On your load balancer:
stream {
proxy_pass backend;
proxy_protocol on;

On the backend servers:
listen *:80 proxy_protocol;
proxy_set_header X-Real-IP $proxy_protocol_addr;

Future Sections
1. Caching static content at the Load balancer

Future Sections

93

## 2. Keep-Alive for Load balancers

94

| Chapter 5: Load Balancing
