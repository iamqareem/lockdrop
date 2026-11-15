---
id: lpi-701-200-07
title: "LPIC-1 · 701-200 — What does 'high availability' mean in the context of IT…",
slug: lpi-701-200-07-lpic-1-701-200-what-does-high-availability-mean-in-the-conte
source: "LPI Learning Material — LPIC-1 (Exam 701-200)",
sourceSection: "1. What does 'high availability' mean in the context of IT operations, and which strategies are, 3. What are two methods organizations can use to reduce latency and improve system, 4. Why is it important to monitor CPU and memory usage, and what issues can high usage, 5. How does proactive monitorin"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "In modern IT environments, operations teams are tasked with maintaining the reliability, Covers 34 sections: What does 'high availability' mean in the context of IT operations, and which strategies are, What are two methods organ.",
---
# LPIC-1 · 701-200 — What does 'high availability' mean in the context of IT…

## 3. What are two methods organizations can use to reduce latency and improve system
responsiveness?

## 4. Why is it important to monitor CPU and memory usage, and what issues can high usage
indicate?

## 5. How does proactive monitoring contribute to high availability and system reliability?

## 1. You are monitoring a web application used by customers across different regions. Recently,
users in South America started complaining about slow response times, while users in Europe
reported no problems. What factors would you investigate to understand and resolve the
latency issue for South American users?

## 2. You’ve been asked to improve the availability of a healthcare application that must be
operational 24/7, even during maintenance or system failures. What architectural and
operational strategies would you propose to achieve this level of high availability?

In modern IT environments, operations teams are tasked with maintaining the reliability,
performance, and availability of digital services. The goals have expanded beyond simply keeping
systems running — they now have to ensure seamless user experiences, minimize downtime, and
proactively detect and resolve issues.
This lesson explored the foundational goals of IT operations and the metrics used to monitor both
technical and logical aspects of system functionality. By understanding concepts such as
availability, latency, and responsiveness, and by learning how to track performance indicators
such as CPU usage, error rates, and user experience metrics, professionals can ensure that their
infrastructure supports business continuity and aligns with user expectations.

## 1. What does “high availability” mean in the context of IT operations, and which strategies are
typically used to achieve it?
High availability refers to a system remaining accessible and operational with minimal
downtime. It is typically achieved using strategies such as redundancy (deploying multiple
instances of critical components), failover mechanisms (automatically switching to backups
when failures occur), proactive monitoring (to detect and resolve issues early), and disaster
recovery plans.
2. List and briefly explain three key factors that influence latency in a system.
Network performance
Delays due to congestion, long physical distances, or inefficient routing.
Processing time
The time the server takes to execute business logic and generate a response.
Storage access
Delays in reading from or writing to databases or storage systems
3. What are two methods organizations can use to reduce latency and improve system
responsiveness?
Content delivery networks (CDNs)
Serve content closer to the user to reduce travel distance.
Caching mechanisms
Store frequently accessed data to avoid repeated processing or database access.
4. Why is it important to monitor CPU and memory usage, and what issues can high usage
indicate?
Monitoring CPU and memory helps identify resource bottlenecks and potential system
instability. High CPU usage may indicate excessive processing demand or inefficient
application behavior, which can lead to slow response times or service interruptions. Similarly,
high memory usage can signal memory leaks or poorly optimized resource allocation,
potentially resulting in swapping, performance degradation, or out-of-memory failures.
5. How does proactive monitoring contribute to high availability and system reliability?

Proactive monitoring allows IT teams to detect and address issues before they affect users. By
continuously tracking system health (e.g., CPU load, memory usage, response times), teams can
respond to anomalies early, prevent outages, and ensure that system reliability and uptime
remain high.

## 1. You are monitoring a web application used by customers across different regions. Recently,
users in South America started complaining about slow response times, while users in Europe
reported no problems. What factors would you investigate to understand and resolve the
latency issue for South American users?
To investigate the latency issue, first check the physical distance between users and the data
center. If the servers are hosted far from South America (e.g., in Europe or Asia), the long
distance could increase latency. Look also at network congestion, routing paths, and whether a
content delivery network (CDN) is in place to cache content closer to users. If not,
implementing a CDN or adding edge servers closer to South America could reduce the latency
and improve performance for those users.
2. You’ve been asked to improve the availability of a healthcare application that must be
operational 24/7, even during maintenance or system failures. What architectural and
operational strategies would you propose to achieve this level of high availability?
To achieve high availability, deploy redundant instances of all critical components (e.g.,
servers, databases, load balancers) to avoid single points of failure. Implement automatic
failover mechanisms to redirect traffic if a service becomes unavailable.
Proactive monitoring tools should be used to detect and address problems early. Develop and
test a disaster recovery plan to ensure that the system can be restored quickly in case of major
disruptions. Aim for geographically distributed infrastructure to protect against regional
outages.

Prometheus is an open source toolkit that monitors systems and issues alerts. It was originally
developed at SoundCloud in 2012. Designed for reliability and scalability, Prometheus has since
become one of the most widely adopted tools for time-series monitoring in cloud-native
In 2016, Prometheus became the second project to join the Cloud Native Computing Foundation
(CNCF), following Kubernetes. This move emphasized its independence from any single company
and helped establish a strong, community-driven governance model. Today, Prometheus is
maintained by a global community of contributors and is used by organizations of all sizes to
monitor infrastructure, applications, containers, and services.

Prometheus Concepts and Architecture
Prometheus collects and stores metrics as time-series data, using a multidimensional data model
that represents each metric by its name and a set of key-value pairs known as labels. Each time
series consists of:

- a metric name
- a timestamp indicating when the measurement was taken
- an optional set of labels that add dimensional
instance="localhost:9100", job="node_exporter")

context

to

metric

(e.g.,

This approach provides a highly flexible and expressive data model, allowing metrics to be
monitored and queried with precision. It enables detailed analysis and aggregation on the basis of
any label or combination of labels. For example:
http_requests_total{method="GET", handler="/api/users"}

can be distinguished from
http_requests_total{method="POST", handler="/api/login"}

by the differing values in the labels, even though the two metrics share the same metric name.
This structure allows for efficient compression, retention, and retrieval, even for large volumes of
high-cardinality data.
Prometheus also supports data retention policies, and older data can be written to remote, longterm storage systems if desired.
Prometheus offers a rich set of features that make it one of the most powerful monitoring tools
available for modern infrastructure. The following sections describes some of the most important
features.

PromQL
Prometheus comes with a built-in, powerful query language called PromQL (Prometheus Query
Language), designed to exploit the multidimensional data model. It supports operations such as:
- Filtering by label
- Aggregation (e.g., sum, avg, max)
- Rate calculations
- Time range comparisons
- Alerting
- Plotting time-series graphs and visualizations

PromQL is used not only for ad-hoc querying but also for powering dashboards (via Grafana) and
generating alert conditions.

Standalone Servers
Each Prometheus server operates independently, without the need for external databases or
distributed storage systems. This design choice simplifies deployment, minimizes complexity, and
isolates failure domains, ensuring that issues in one node do not affect others. By operating
autonomously, the Prometheus server enhances reliability, reduces operational overhead, and
makes it easier to maintain and scale monitoring systems — especially in dynamic or cloud-native
The Prometheus server is the central component that performs the following critical functions:
Scraping
Pulling metrics from configured targets over HTTP.
Storage
Storing the scraped metrics locally in a highly efficient time-series database.
Querying
Accepting queries through the PromQL interface for metric analysis and alert generation.
Evaluation
Evaluating alert rules and triggering alerts when defined conditions are met.

Service Discovery
Instead of requiring manual configuration for each target, Prometheus can dynamically discover
endpoints to monitor using built-in service discovery mechanisms. This enables Prometheus to
adapt in real-time to changes in modern, elastic environments.
Supported service discovery mechanisms include:
- Kubernetes
- Consul
- Cloud services, including Amazon.com’s EC2, Google Compute Engine, and Microsoft Azure
- File-based static configurations
- DNS-based discovery

This ensures seamless integration with dynamic infrastructure, such as containerized workloads
and microservices.

Pull-Based Collection Model
Prometheus pulls its data over HTTP to scrape metrics endpoints on target systems regularly. This
design simplifies debugging, offers full control over when and how data is collected, and avoids
the need for agents that push data (though pushing is also supported).

Push Support via the Pushgateway
Another important component in the Prometheus ecosystem is the Pushgateway. Although
Prometheus is built around a pull-based model to scrape metrics periodically from predefined
targets, this model doesn’t work well for short-lived jobs or ephemeral batch processes that might
start and finish execution between two scrape intervals. As a result, important metrics from these
transient tasks could be missed entirely, creating blind spots in observability.
The Pushgateway solves this problem by providing a temporary metrics storage endpoint to
which short-lived jobs can push their metrics upon completion. These metrics are then stored in
memory by the Pushgateway and made available for Prometheus to scrape during its next
collection cycle. This approach ensures that even brief, one-time tasks contribute to the
monitoring data and can be analyzed later. This mechanism are particularly useful for jobs such
as:
- Automated backups
- Report generation
- Data migrations
- CI/CD pipeline tasks
- Short-lived batch jobs
- Cron tasks
- Ephemeral processes that finish before Prometheus’s scrape interval
It is important to note that the Pushgateway is not intended for long-lived or continuously running
applications. Because it doesn’t automatically expire old data, teams must carefully manage the
lifecycle of pushed metrics and clean up old data to avoid stale or misleading information. This
can be handled by the pushing job itself, or by additional automation that deletes obsolete metrics
as needed.
By incorporating the Pushgateway into a monitoring setup, organizations ensure that every

job — no matter how short-lived — is observed, and that its outcomes are measurable. This
capability helps achieve complete observability, provides valuable insights into automated
workflows, and supports auditing, performance tracking, and incident forensics.

Built-In Graphing and Dashboard Support
Prometheus supports:
- A built-in expression browser for ad-hoc queries and graphs
- Integration with Grafana for rich, interactive dashboards
- Multiple export formats for other tools and external visualizations

Exporters: Bridging the Metrics Gap
Exporters are among the foundational components of Prometheus. Exporters are specialized
programs or services that collect and expose metrics from third-party systems in a format that
Prometheus can scrape — typically through an HTTP endpoint exposing metrics in a plain-text
format, following Prometheus’s standards.
Since many applications and services do not natively provide metrics in a Prometheus-compatible
format, exporters serve as adapters that bridge the gap between these systems and the
Prometheus monitoring ecosystem. Exporters are vital for enabling observability across a diverse
set of infrastructure, from operating systems and hardware to databases, web servers, and custom
applications.
Node Exporter
One of the most widely used exporters is the node exporter, which gathers low-level system
metrics such as:
- CPU load
- Memory consumption
- Disk I/O
- Filesystem operations
- Network interface operations
These metrics are essential for understanding the health and performance of the host operating
system, especially in environments running containers or virtual machines.

Blackbox Exporter
The blackbox exporter monitors remote resources by performing external checks. It operates at a
higher level of abstraction than the node exporter, carrying out synthetic monitoring.
Rather than pulling internal metrics from an application, the blackbox exporter probes endpoints
using such protocols as HTTP, HTTPS, TCP, ICMP (ping), and DNS. The exporter simulates external
access to verify availability, latency, and response codes. This is particularly useful for monitoring
public-facing APIs, websites, or internal services from the perspective of an external client,
without requiring access to the target’s source code or internal metrics.
Custom Exporters
Thanks to a growing ecosystem, exporters are available for nearly every commonly used service
and platform, including MySQL, PostgreSQL, MongoDB, Redis, HAProxy, Nginx, and even
hardware-level metrics from devices such as GPUs and baseboard management controllers
(BMCs). Moreover, developers can create custom exporters to expose application-specific metrics,
making Prometheus highly extensible.
Exporters standardize observability across a wide range of systems, including databases (e.g.,
MySQL, PostgreSQL), web servers (e.g., Nginx), cloud services, and custom applications.
By incorporating exporters, Prometheus becomes a centralized observability hub, aggregating
data from across the entire stack. It enables unified monitoring, troubleshooting, alerting, and
performance optimization. Understanding and deploying exporters is a key step in building a
comprehensive monitoring strategy for any modern IT environment.

Alertmanager: Intelligent Alert Routing and Management
Monitoring needs actionable alerts to help operators respond in a timely manner to problems in
production environments. Prometheus addresses this need through alerting rules, which allow
operators to define threshold-based conditions that trigger alerts when systems behave
abnormally. For example, rules can detect when CPU usage exceeds 90%, when a service becomes
unavailable, or when a disk is nearing capacity. When the specified condition is met, Prometheus
generates an alert and forwards it to a dedicated component: the Alertmanager.
The Alertmanager is responsible for intelligent alert handling and serves as the central hub for
managing the lifecycle and delivery of alerts. Its core features include:
Deduplication
Alertmanager automatically filters out duplicate alerts to avoid overwhelming responders with
redundant notifications.

Grouping
It clusters together related alerts (e.g., multiple services failing in the same region) to provide
contextual clarity.
Routing
Directs alerts to the appropriate teams or communication channels based on customizable
rules and escalation policies. Supported destinations include email, Slack, Microsoft Teams,
PagerDuty, Opsgenie, and other incident-management platforms.
Silencing
It temporarily suppresses notifications for known issues during maintenance windows or
ongoing investigations.
Inhibition rules
It prevents less important alerts from being sent when a higher-priority alert is already active.
Escalation
It ensures that unresolved alerts are escalated to higher levels of responsibility over time.
This robust alerting architecture ensures that the right people are informed at the right time,
without overwhelming teams with noise. By combining custom alert definitions, flexible routing,
and context-aware suppression, Prometheus and Alertmanager together help organizations
maintain high availability, rapid incident response, and operational focus, reducing both alert
fatigue and response time.

Installing Prometheus
Prometheus can be installed in various ways, depending on the operating system or environment
in use.

Using the Tarball
The Prometheus official website recommends downloading the latest release of Prometheus for
the appropriate platform (https://prometheus.io/download/) and then extracting the files. An
example installation follows. It assumes that version 3.3.0, release candidate 0, of Prometheus has
been downloaded to the local system.
$ tar xvzf prometheus-3.3.0-rc.0.linux-amd64.tar.gz
prometheus-3.3.0-rc.0.linux-amd64/
prometheus-3.3.0-rc.0.linux-amd64/LICENSE

prometheus-3.3.0-rc.0.linux-amd64/promtool
$ cd prometheus-3.3.0-rc.0.linux-amd64

Start Prometheus in the background with the default configuration:
$ ./prometheus --config.file=prometheus.yml &

Runnnig in Docker Container
Prometheus can also start up in a Docker environment for quick setup and testing. Use the
following command to start a container with a custom configuration file:
$ docker run -p 9090:9090 \
-v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
prom/prometheus

Running Through Helm
Add the prometheus-community Helm repository:
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
"prometheus-community" has been added to your repositories

Update the local Helm repository index:
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "prometheus-community" chart repository
...Successfully got an update from the "bitnami" chart repository
Update Complete. ⎈Happy Helming!⎈

Install Prometheus:
$ helm install prometheus prometheus-community/prometheus
NAME: prometheus
LAST DEPLOYED: Fri Apr

4 21:00:12 2025

If customization is needed, use the -f option with a custom values.yaml file:
$ helm install prometheus prometheus-community/prometheus -f my-values.yaml

The prometheus.yml Configuration File
Prometheus uses a YAML configuration file named prometheus.yml to control its behavior. This
file contains key settings such as:
Scrape intervals
How frequently Prometheus collects metrics.
Targets
The endpoints from which Prometheus scrapes metrics.
Jobs
Logical groupings of targets (e.g., node_exporter, web_app, database).
A sample comfiguration file follows:
global:
scrape_interval: 15s
evaluation_interval: 15s
rule_files:
- job_name: prometheus
- targets: ['localhost:9090']
- job_name: 'file-sd-example'
file_sd_configs:
- files:
- ./file_sd_targets.json
refresh_interval: 30s

The Prometheus configuration file is typically divided into three main blocks: global,
rule_files, and scrape_configs. Each block is described in the following sections.

The global Block
The global section defines configuration settings that apply across the entire Prometheus server.
Two key options commonly appear here:
scrape_interval
Specifies how frequently Prometheus scrapes metrics from configured targets. This value can
be overridden for individual jobs, but the global setting serves as a default. In the example
configuration, it is set to 15s, meaning Prometheus scrapes metrics every 15 seconds.
evaluation_interval
Determines how often Prometheus evaluates its rules. Rules are used to generate alerts and to
create new time series based on existing data.

The rule_files Block
The rule_files section lists rule files that Prometheus should load. These files contain recording
and alerting rules written in YAML. In the default setup, this block is typically empty. If a custom
rule file is needed, add it here.

The scrape_configs Block
The scrape_configs section defines the actual monitoring targets — the endpoints from which
Prometheus collects metrics.
For instance, by default, Prometheus is configured to monitor itself. This is done via a job called
prometheus, which scrapes the Prometheus server’s own metrics endpoint:
- job_name: prometheus
- targets: ['localhost:9090']
- job_name: 'file-sd-example'
file_sd_configs:
- files:
- ./file_sd_targets.json
refresh_interval: 30s

Some of the notable specifications are:
job_name: 'file-sd-example'
Sets the name of the scrape job. It groups metrics and labels them under this job name in
Prometheus.
file_sd_configs
Tells Prometheus to use file-based service discovery to find targets dynamically.
files
Lists the paths to JSON or YAML files that contain the list of targets. In this case, Prometheus is
using a local file named ./file_sd_targets.json.
Prometheus expects each target to expose its metrics at the /metrics path. So in this default
setup, Prometheus scrapes data from http://localhost:9090/metrics.
The resulting time series data provides insights into the state and performance of the Prometheus
server itself — such as CPU usage, active time series count, and scrape durations — which is
crucial for debugging and capacity planning.

Starting Prometheus
To launch Prometheus, navigate to the directory containing the Prometheus binary and run the
following command. The configuration file used in the command is the default prometheus.yml:
$ ./prometheus --config.file=prometheus.yml

Once started, Prometheus begins collecting metrics.
To use Prometheus at this point, visit its web interface at http://localhost:9090. So far, no
scraping has occured (Prometheus web interface).

Figure 7. Prometheus web interface

Give the metrics endpoint about 30 seconds to scrape and collect initial metrics from its own HTTP
endpoint, then visit the interface at http://localhost:9090/metrics (Metrics endpoint):

Figure 8. Metrics endpoint

Exploring Metrics With the Expression Browser
Prometheus provides a built-in expression browser for exploring collected metrics. To gain access
to it, go to the http://localhost:9090/graph web page and switch to the “Table” view within
the “Graph” tab.
Try querying a sample metric:

promhttp_metric_handler_requests_total

Query for promhttp_metric_handler_requests_total displays what has been collected so far
on this metric, which shows the total number of /metrics requests served by Prometheus.
Multiple time series are returned, each with different labels representing HTTP status codes and
handler paths.

Figure 9. Query for promhttp_metric_handler_requests_total

To filter for only successful requests (HTTP 200), use:
promhttp_metric_handler_requests_total{code="200"}

To count how many different time series this metric includes, use:
count(promhttp_metric_handler_requests_total)

Using the Graph Interface
Prometheus can display metric data in visual form directly in its user interface. To experiment
with this interface, on http://localhost:9090/graph, switch to the “Graph” tab.
For instance, to view a per-second rate of successful HTTP requests (HTTP responses of 200),
enter:
rate(promhttp_metric_handler_requests_total{code="200"}[1m])

Results

are

shown

in

Graph

for

rate(promhttp_metric_handler_requests_total{code="200"}[1m]).

Figure 10. Graph for rate(promhttp_metric_handler_requests_total{code="200"}[1m])

The time range and resolution can be adjusted to explore trends and spikes interactively.

1. How does Prometheus represent its metrics, and what are labels used for?

2. What is an exporter in Prometheus? Give an example.

## 3. Write a PromQL query to return all metrics related to HTTP requests that resulted in HTTP 500
errors.

## 4. You are setting up Prometheus to monitor various services in your infrastructure. The
prometheus.yml Prometheus configuration file allows you to define how Prometheus
discovers and scrapes metrics from those services. Which section of the Prometheus
configuration is used to define scrape jobs, including job names, target discovery, and scrape
intervals?

## 5. You are configuring Prometheus to monitor a cluster of servers. In the prometheus.yml file,
you need to specify which targets (such as nodes) are monitored. Which section of the
Prometheus configuration defines which nodes are monitored?

## 1. Imagine you are tasked with building a Grafana dashboard for a web application that
experiences traffic spikes during marketing campaigns. What metrics would you include in the
dashboard to monitor the health and performance of the application? How would you
structure the panels, and what visualizations would you choose?

Prometheus is a widely adopted, open source monitoring and alerting toolkit. Its design centers on
reliability, simplicity, and powerful time-series data handling. Prometheus collects data using a
pull-based model, stores it in an efficient local time-series database, and allows users to query it
using PromQL, a flexible and expressive query language. With native support for service
discovery, exporters, and visualization through Grafana, Prometheus offers a robust solution for
monitoring applications, infrastructure, and ephemeral workloads across dynamic environments.

1. How does Prometheus represent its metrics, and what are labels used for?
Prometheus stores data as time series, each consisting of a metric name, a timestamp, and keyvalue pairs called labels. Labels add dimensional context (e.g., instance, job, method) that allow
powerful filtering and aggregation with PromQL.
2. What is an exporter in Prometheus? Give an example.
An exporter is a component that exposes metrics from external systems in a Prometheuscompatible format. For example, the node exporter provides system-level metrics such as CPU,
memory, and disk usage.
3. Write a PromQL query to return all metrics related to HTTP requests that resulted in HTTP 500
errors.
This
following
query
requests
time
series
for
promhttp_metric_handler_requests_total with the label code="500".

metric

promhttp_metric_handler_requests_total{code="500"}

## 4. You are setting up Prometheus to monitor various services in your infrastructure. The
prometheus.yml Prometheus configuration file allows you to define how Prometheus
discovers and scrapes metrics from those services. Which section of the Prometheus
configuration is used to define scrape jobs, including job names, target discovery, and scrape
intervals?
scrape_configs

## 5. You are configuring Prometheus to monitor a cluster of servers. In the prometheus.yml file,
you need to specify which targets (such as nodes) are monitored. Which section of the
Prometheus configuration defines which nodes are monitored?
targets

## 1. Imagine you are tasked with building a Grafana dashboard for a web application that
experiences traffic spikes during marketing campaigns. What metrics would you include in the
dashboard to monitor the health and performance of the application? How would you
structure the panels, and what visualizations would you choose?
For a web application that experiences traffic spikes during marketing campaigns, you can
create a Grafana dashboard structured around the following categories:
- Traffic and load
http_requests_total
Line graph showing requests per second, filtered by HTTP status codes.
rate(http_requests_total[1m])
Groups output by method and status.
- Latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
Tracks 95th percentile latency.
Bar or line graph for latency over time.
- Application health
up
Shows which services are currently responding.
prometheus_target_interval_length_seconds
Verifies scrape health.
- Error monitoring
http_requests_total{status!~"2.."}
Limits output to errors (e.g., 4xx, 5xx) using a stacked bar chart.
- System resources — CPU and memory usage from node_exporter via:
node_cpu_seconds_total and node_memory_MemAvailable_bytes

- Real-time indicators — single-stat panels for:
- Active users
- Queue length
- Current success rate

In modern IT environments, driven by microservices, containers, and dynamic infrastructure,
observability has become mission-critical. Tools such as Prometheus and Grafana form a robust,
open-source monitoring stack that empowers organizations to collect, analyze, visualize, and act
on metrics data in real time. Prometheus offers a powerful pull-based model for scraping timeseries metrics. It integrates seamlessly with Kubernetes and Docker, and supports advanced
querying through PromQL, the Prometheus Query Language.
Exporters such as the node exporter, blackbox exporter, and MySQL exporter help bridge the gap
between Prometheus and systems that don’t natively expose metrics. Together, these tools enable
the monitoring of containers, Nginx servers, MySQL databases, and Kubernetes nodes with
precision. By instrumenting applications, collecting metrics from various sources, and querying
the metrics intelligently using PromQL, teams gain deep insight into system performance,
availability, and reliability — empowering proactive incident response, capacity planning, and
continuous improvement.

Grafana: Visualizing Time-Series Metrics
While Prometheus excels at collecting, storing, and querying time-series data, it lacks built-in tools
for intuitive data visualization. This is where Grafana shines — as a powerful, open source
analytics and monitoring platform that transforms raw Prometheus metrics into interactive,
insightful dashboards.
Grafana lets teams create customizable dashboards that bring observability to life. Through
seamless integration with PromQL, Grafana allows users to write precise queries and visualize the
results in real time. Its rich library of visual components includes:
Line charts
tracking metrics such as CPU usage, memory consumption, and request latency over time.
Bar graphs
comparing usage across multiple nodes or services.
Single-value panels
highlighting key metrics such as uptime, error rate, or active user count.
Heatmaps
displaying the intensity or frequency of events across time intervals.
Built-in alerting
triggering visual and notification-based alerts when thresholds are breached, enabling
proactive responses.
Grafana lets IT, DevOps, and Site Reliability Engineering (SRE) teams monitor system health at a
glance, identify trends before they become issues, and drill down into anomalies for root cause
analysis. For instance, a Grafana dashboard might reveal a sudden spike in error rates aligned
with a traffic surge, providing immediate visibility into performance bottlenecks.
By pairing Prometheus’s robust data collection with Grafana’s dynamic visualization,
organizations gain a comprehensive observability stack that supports faster troubleshooting,
better performance tuning, and data-driven operational decisions.
To download Grafana, visit the Grafana download page (https://grafana.com/grafana/download).
After installation on Ubuntu or Debian, run Grafana through:
$ sudo systemctl start grafana-server
$ sudo systemctl enable grafana-server

To access the Grafana web interface, open http://localhost:3000 in the browser. To connect
Grafana to Prometheus, visit http://localhost:3000 and log in with username: admin and
password: admin (Prometheus will advise changing the password upon first login).
Now add Prometheus as a data source:
1. In the left sidebar, click the gear icon (Configuration).
2. Click “Data Sources”.
3. Click the blue “Add data source” button.
4. Select “Prometheus” from the list.
## 5. In the HTTP URL field, enter http://localhost:9090. If Prometheus is on another machine,
replace localhost with the server IP address or hostname.)
6. Click “Save & Test”.
A message “Data source is working” should appear in green.

Figure 11. Sample Grafana dashboard with Prometheus 2.0 statistics

Monitoring Containers and Microservices Using Prometheus
In modern IT environments, containers and microservices have become the backbone of scalable
and dynamic applications. Monitoring these components is essential to ensure their reliability,
performance, and availability. Prometheus excels in this domain by integrating seamlessly with
container orchestration platforms like Kubernetes, and by supporting service discovery

mechanisms. Prometheus can help monitor containers and microservices effectively, providing
insights into their behavior and supporting smooth operation.

Collecting Nginx Metrics in Prometheus
To illustrate monitoring through Prometheus and Grafana, the following example creates an
Nginx container with the Stub Status module enabled — a lightweight Nginx feature that exposes
basic metrics such as active connections, the requests handled, and states
(reading/writing/waiting). The Stub Status module is ideal for Prometheus monitoring.
Start by creating a custom nginx.conf file to enable stub_status:
events {}
http {
server {
listen 80;
location /nginx_status {
stub_status;
allow all;

Next, run the Nginx container and bind the custom nginx.conf file to /etc/nginx/nginx.conf
inside the container to apply the configuration:
$ docker run -d --name nginx \
-p 8080:80 \
-v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \

Now Nginx metrics can be viewed through the web interface:
$ curl http://localhost:8080/nginx_status
Active connections: 1
server accepts handled requests
4 4 4
Reading: 0 Writing: 1 Waiting: 0

Run a container that acts as an exporter: it fetches the raw Nginx metrics exposed at
/nginx_status and converts them into a Prometheus-compatible format, making them available
at a new HTTP endpoint that Prometheus can scrape:
$ docker run -d --name nginx-exporter \
-p 9113:9113 \
--link nginx \
nginx/nginx-prometheus-exporter:latest \
-nginx.scrape-uri http://nginx/nginx_status

Edit the prometheus.yml configuration file to add a new scrape job for the Nginx exporter. This
tells Prometheus where to find the exporter’s metrics endpoint (e.g., localhost:9113) so it can
periodically collect and store the Nginx metrics in its time-series database.
Under the scrape_configs section, add a new block with job_name: 'nginx'. Since this is a
YAML file, make sure the indentation is correct.
- job_name: 'nginx'
- targets: ['localhost:9113']

Restart Prometheus if it is already running, or start it manually:
$ ./prometheus --config.file=prometheus.yml

Now open a browser and navigate to http://localhost:9090. In the Prometheus interface, use
the search bar to verify that the following metrics nginx_connections_active and
nginx_http_requests_total are available.
Results should look something like Prometheus nginx_connections_active metric.

Figure 12. Prometheus nginx_connections_active metric

Now add the Grafana dashboard in http://localhost:3000 as follows:
1. Add Prometheus as a data source (if is not one already).
## 2. Import a dashboard:
a. Click the “New” button, then “Import”.
b. Use Dashboard ID: 12708 (a popular Nginx dashboard).
c. Select the Prometheus data source and import it.
Nginx metrics should appear on the dashboard as shown in Nginx connections in graphical form.

Figure 13. Nginx connections in graphical form

Prometheus and Grafana are now monitoring Nginx inside Docker.

Collecting MySQL Metrics in Prometheus
The next example deploys a MySQL database using Helm, and monitors it with Prometheus by
using a MySQL exporter — a lightweight service that connects to the MySQL server, collects
internal metrics (queries, connections, slow queries, etc.), and exposes them in a Prometheuscompatible format.
Start by adding the Bitnami Helm repository, if it is not already present in Helm. Bitnami provides
a well-maintained MariaDB Helm chart with built-in support for Prometheus metrics.
$ helm repo add bitnami https://charts.bitnami.com/bitnami

Then install MySQL:
$ helm install my-mysql bitnami/mysql \
--set auth.rootPassword=your_password \
--set primary.service.type=ClusterIP
NAME: my-mysql

Take note of the root password (your_password) and the service name (likely mymysql.default.svc.cluster.local inside the cluster).
Now create a MySQL user for monitoring. To do so, access the MySQL pod and execute mysql -u
root -p inside the shell. Specify user root with password your_password:
$ kubectl exec -it $(kubectl get pods -l app.kubernetes.io/name=mysql -o name) -- bash
Defaulted container "mysql" out of: mysql, preserve-logs-symlinks (init)
I have no name!@my-mysql-0:/$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.

Commands end with ; or \g.

Your MySQL connection id is 44
mysql>

Create a user exporter with password exporter_password and access to metrics:
mysql>
CREATE USER 'exporter'@'%' IDENTIFIED BY 'exporter_password' WITH MAX_USER_CONNECTIONS 3;
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *. TO 'exporter'@'%';*
FLUSH PRIVILEGES;

The following example shows the previous SQL commands with the expected output:
mysql> CREATE USER 'exporter'@'%' IDENTIFIED BY 'exporter_password' WITH
MAX_USER_CONNECTIONS 3;
Query OK, 0 rows affected (0.05 sec)
mysql> GRANT PROCESS, REPLICATION CLIENT, SELECT ON *. TO 'exporter'@'%';*
Query OK, 0 rows affected (0.01 sec)
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)
mysql> exit
Bye
/$ exit

To deploy the mysqld_exporter, add the Prometheus community Helm charts:
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

Create a file named mysql-exporter-values.yaml with the MySQL connection details:
mysql:
db: ""
host: "my-mysql"
user: "exporter"
pass: "exporter_password"
port: 3306
protocol: ""

Now install the prometheus-mysql-exporter Helm chart:
$ helm upgrade --install mysql-exporter prometheus-community/prometheus-mysql-exporter -f
mysql-exporter-values.yaml

It is time to add MySQL to Prometheus targets. Update prometheus.yml, just below
scrape_configs, with:
- job_name: 'mysql'
- targets: ['localhost:9104']

Visit http://<your-prometheus>:9090 in a browser to test the monitoring. Search for metrics
like:
- mysql_global_status_threads_connected
- mysql_global_status_queries
- mysql_up
An example of results from
mysql_global_status_queries metric.

one

Prometheus

query

appear

in

Prometheus

Figure 14. Prometheus mysql_global_status_queries metric

Now, add the Grafana dashboard in http://localhost:3000 as follows:
1. Add Prometheus as a data source (if is not one already).
## 2. Import a dashboard:
a. Click the “New” button, then “Import.”
b. Use Dashboard ID: 14057 (a popular MySQL overview dashboard).
c. Select the Prometheus data source and import it.
MySQL metrics should now appear on the dashboard as shown in MySQL statistics in graphical
form.

Figure 15. MySQL statistics in graphical form

Prometheus and Grafana are now monitoring MySQL inside Kubernetes.

Collecting CPU, Memory, and Disk Metrics from Kubernetes Nodes in
Prometheus
The following example uses Prometheus’s node exporter to show a node’s behavior in Kubernetes.
The example runs in a Minikube environment for convenient testing.
Create a file named node-exporter.yaml with the following content:
kind: DaemonSet
name: node-exporter
app: node-exporter
app: node-exporter

app: node-exporter
hostNetwork: true
hostPID: true
- name: node-exporter
image: prom/node-exporter:latest
- containerPort: 9100
hostPort: 9100
limits:
memory: 50Mi
cpu: 100m
securityContext:
privileged: true
- name: proc
mountPath: /host/proc
readOnly: true
- name: sys
mountPath: /host/sys
readOnly: true
- name: root
mountPath: /rootfs
readOnly: true
args:
- '--path.procfs=/host/proc'
- '--path.sysfs=/host/sys'
- '--path.rootfs=/rootfs'
- name: proc
path: /proc
- name: sys
path: /sys
- name: root
path: /

Apply the configuration as follows:

$ kubectl apply -f node.yaml
daemonset.apps/node-exporter created

In Minikube, the service can be accessed like this:
$ minikube service list

If the node exporter doesn’t appear (because it’s using hostPort), just forward it to a port on the
host:
$ kubectl port-forward daemonset/node-exporter 9100 &

Edit the Prometheus prometheus.yml configuration, just below scrape_configs, as follows.
Replace localhost with the node’s IP address. Since we are using Minikube, the node exporter is
running on the same host as Prometheus:
- job_name: 'node-exporter'
- targets: ['localhost:9100']

Restart the Prometheus server to reload the targets.
The following PromQL queries the node exporter for CPU usage:
rate(node_cpu_seconds_total{mode!="idle"}[5m])

And the following queries the node exporter for memory usage:
(node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)

The following queries the node exporter for disk usage:
node_filesystem_avail_bytes / node_filesystem_size_bytes

Common Exporters in Prometheus
Prometheus exporters play a critical role in enabling the monitoring of systems, services, and
applications that do not natively expose metrics in a format compatible with Prometheus.
Exporters act as bridges, collecting metrics from their particular sources and exposing them in a
way that Prometheus can scrape. Understanding the purpose and functionality of common
exporters is essential for building a comprehensive monitoring strategy.
Some of the exporters appeared in the previous lesson; the following subsections list the most
useful one from a DevOps perspective.
Node exporter
The node exporter is one of the most widely used Prometheus exporters. It collects hardware
and operating system-level metrics from Linux or Unix hosts. These metrics include CPU usage,
memory consumption, disk I/O, network statistics, and filesystem information.
Blackbox exporter
The blackbox exporter probes endpoints to monitor their availability and responsiveness. It
supports multiple probing protocols, including HTTP, HTTPS, TCP, ICMP, and DNS.
MySQL exporter
The MySQL exporter collects metrics from MySQL databases, providing insights into database
performance, query execution, and resource utilization.
PostgreSQL exporter
The PostgreSQL exporter is similar to the MySQL exporter but acts on PostgreSQL databases. It
collects metrics related to query performance, replication status, and database connections.
Redis exporter
The Redis exporter collects metrics from Redis instances, providing visibility into memory
usage, command execution, and client connections.
Kafka exporter
The Kafka exporter collects metrics from Apache Kafka clusters, focusing on topic partitions,
consumer groups, and broker performance.
Nginx exporter
The Nginx exporter collects metrics from Nginx web servers, providing insights into request
rates, response times, and error rates.

Windows exporter
The Windows exporter collects metrics from Windows-based systems, including CPU, memory,
disk, and network usage.
SNMP exporter
The SNMP exporter collects metrics from devices that support the Simple Network
Management Protocol (SNMP), such as routers, switches, and printers.

Advanced PromQL: Metrics Aggregation and Querying over
Time and Labels
This section shows how to use PromQL to extract valuable insights from monitoring data, by
writing expressive queries that reveal system behavior in real time. It also shows how to apply
aggregate functions to summarize data meaningfully.

Instant Vectors
An instant vector is the default result type in Prometheus. It returns the latest value of a metric at
the current moment.
The following example, involving requests to an Nginx server, returns the current value of the
counter for all labels.
nginx_http_requests_total

Aggregating Instant Vectors
This section refers to the same metric as the previous example, but shows how to get common
calculations such as sum and average.
To sum the current request counts for each job, enter:
sum(nginx_http_requests_total) by (job)

To average the current request counts for each job, enter:
avg(nginx_http_requests_total) by (job)

Range Vectors
A range vector is a set of values over a period of time, used for calculating trends, rates, and
statistical aggregates. It uses a time selector like [5m] for five minutes or [1h] for one hour.
The following example calculates a per-second rate of HTTP requests over the most recent 5
minutes:
rate(nginx_http_requests_total[5m])

The following example uses an aggregating range vector to get average HTTP requests over the
most recent 10 minutes.
avg_over_time(nginx_http_requests_total[10m])

Aggregate Metrics for Specific Labels
Prometheus can group metrics by one or more labels using the by () syntax.
The following example calculates the per-second HTTP request rate per instance:
sum(rate(nginx_http_requests_total[1m])) by (instance)

Application Instrumentation
Observability is no longer a luxury — it is a necessity. Application instrumentation is the practice
of embedding monitoring code directly into applications to expose critical metrics about
performance, usage, and internal behavior. While infrastructure monitoring indicates whether a
server is up or a container is running, instrumentation reveals what the code is doing. Application
instrumentation can report how many requests are being handled, how long they take, or how
often errors occur. This instrumentation plays an invaluable role as the bridge between the code
and the monitoring system.
The first consideration in application instrumentation is choosing what should be measured.
Developers should think in terms of key performance indicators (KPIs) relevant to their
application’s purpose. For instance, an e-commerce app might track cart abandonment rates,
checkout errors, or API latency. A streaming platform might instrument metrics like buffer time,
video start delay, or stream failures. By proactively identifying these metrics, teams can expose
them through standardized endpoints (like /metrics in Prometheus) and gain insight into the

health and behavior of the app in real-world conditions.
Moreover, developers need to be aware of how metrics are structured and labeled. Prometheus
encourages a dimensional model, where metrics include labels (key-value pairs) for contextual
filtering and aggregation. Misuse of labels — such as using unique user IDs — can lead to overly
high cardinality and performance bottlenecks. Therefore, teams should establish guidelines for
metric naming, label usage, and documentation. A clear and consistent approach to
instrumentation not only improves observability, but also makes dashboards, queries, and alerts
easier to manage and interpret.
Ultimately, cultivating awareness around instrumentation leads to more reliable, maintainable,
and scalable systems. Instrumentation empowers developers to detect anomalies before they
escalate, respond to incidents more effectively, and continuously improve application
In short, instrumentation is not just a technical practice — it is a mindset. Teams who prioritize it
are better equipped to build resilient applications that meet both business goals and user
expectations.

Thanos
As organizations scale their monitoring infrastructure, Prometheus alone may no longer suffice
for long-term storage, high availability, or cross-cluster visibility. Thanos is an open source project
that extends Prometheus by adding a global viewpoint, unlimited storage, and reliable high
availability — all without compromising Prometheus’s native efficiency.
At its core, Thanos introduces a sidecar architecture that runs alongside each Prometheus
instance. The sidecar uploads time-series data to an object storage backend such as S3, GCS, or
Azure Blob Storage, enabling the long-term retention of metrics beyond Prometheus’s local
storage limits. This is crucial for teams who need to retain metrics for months or even years for
auditing, capacity planning, or compliance.
Further powerful capabilities provided by Thanos include horizontal scalability and global
querying. Components such as the Thanos Querier can query across multiple Prometheus
instances or regions from a single API endpoint, achieving a federated view of metrics. This is
especially valuable in multicluster or hybrid cloud environments, where Prometheus servers are
distributed.
Additionally, the Thanos Store Gateway retrieves data from object storage to serve historical
queries, while the Compactor optimizes and down-samples metrics to reduce storage costs.

## 1. After running an Nginx container with stub_status enabled and an Nginx exporter, what
configuration do you need to add to prometheus.yml?

## 2. Which PromQL query should you use in the Prometheus expression browser to view the
number of active Nginx connections?

## 3. What query would you use to view the total number of handled HTTP requests with the label
code="200" in Nginx?

## 4. Which PromQL expression gives you the per-second rate of Nginx HTTP requests over the most
recent 5 minutes?

## 1. You suspect that your Nginx server experiences a significant increase in traffic during lunch
hours (12:00 PM to 2:00 PM). How would you use PromQL to explore this trend and validate
your assumption using the metric nginx_http_requests_total?

## 2. Your users report that the website is “slow to respond” during peak hours. Which combination
of Nginx metrics would you explore using Prometheus or Grafana to investigate possible
bottlenecks in the response pipeline?

This lesson explored how Prometheus and Grafana provide a powerful, integrated solution for
monitoring modern systems, containers, and microservices. It began by introducing Grafana’s
role in visualizing Prometheus time-series data through customizable dashboards and alerting. It
then demonstrated how to monitor Nginx and MySQL using exporters, including setup steps with
Docker and Helm, and explained how to collect system metrics from Kubernetes nodes using the
node exporter. Finally, it covered the most common Prometheus exporters and illustrated how to
use PromQL to query and aggregate metrics over time, empowering teams to gain actionable
insights and build a robust strategy for observability.

## 1. After running an Nginx container with stub status enabled and an Nginx exporter, what
configuration do you need to add to prometheus.yml?
- job_name: 'nginx'
- targets: ['localhost:9113']

## 2. Which PromQL query should you use in the Prometheus expression browser to view the
number of active Nginx connections?
nginx_connections_active

## 3. What query would you use to view the total number of handled HTTP requests with the label
code="200" in Nginx?
nginx_http_requests_total{code="200"}

## 4. Which PromQL expression gives you the per-second rate of Nginx HTTP requests over the most
recent 5 minutes?
rate(nginx_http_requests_total[5m])

## 1. You suspect that your Nginx server experiences a significant increase in traffic during lunch
hours (12:00 PM to 2:00 PM). How would you use PromQL to explore this trend and validate
your assumption using the metric nginx_http_requests_total?
To explore traffic patterns, you could use a time range query in the Prometheus interface or
Grafana over a historical period that includes multiple days:
rate(nginx_http_requests_total[5m])

Then, in Grafana, set the time window to several days and focus on the timeframe between
12:00 and 14:00. Look for consistent spikes in the rate during those hours. This visual analysis
can confirm whether traffic increases during lunch and help in planning capacity scaling.
2. Your users report that the website is “slow to respond” during peak hours. Which combination
of Nginx metrics would you explore using Prometheus or Grafana to investigate possible
bottlenecks in the response pipeline?
Explore the following metrics to identify bottlenecks:
nginx_connections_active
To check the total number of open connections.
nginx_connections_writing
To see how many responses are currently being sent.
nginx_connections_waiting
To find how many clients are idle, possibly waiting for a response.
Analyzing these over time during peak hours may reveal patterns such as an increase in
waiting connections without a corresponding increase in writing connections — which could
indicate that your Nginx backend or upstream services are slow or overloaded.

### 704.3 Log Management and Analysis
DevOps Tools Engineer v2.0, Exam 701, Objective 704.3
- Understand how application and system logging works
- Understand the architecture and features of commonly used open source logging stacks
- Awareness of syslogd and systemd-journald
- Elasticsearch and OpenSearch
- Logstash and filebeat
- Fluentd and FluentBit
- Kibana
- Loki and promtail
- Grafana
- Greylog2

### 704.3 Log Management and Analysis

Logging is a foundational component of observability. Whether the task is building cloud-native
microservices, managing legacy infrastructure, or operating at scale, the ability to capture, store,
search, and analyze logs is crucial for ensuring system reliability, security, and performance.
Application and system logs act as detailed chronological records of events occurring within a
software system. They serve as invaluable tools for developers, system administrators, DevOps
engineers, and security professionals. When properly implemented, logging enables teams to
monitor application behavior, detect anomalies, troubleshoot issues, audit access and operations,
and even predict failures before they affect users.
This lesson explains how logging works at both the system and application levels. The lesson
explores open source logging stacks like Elasticsearch, OpenSearch, Logstash, Filebeat, Fluentd,
Fluent Bit, Kibana, Loki, promtail, Grafana, and Graylog2. It also examines popular tools for log
collection, parsing, visualization, and management.

Application and System Logging
Application and system logging are distinct but complementary activities. Application logging
focuses on capturing events specific to the operation of software, whereas system logging is
concerned with the behavior and state of the operating system and underlying infrastructure.

Application Logs
Application logs are typically generated by developers through deliberate code instrumentation,
which means embedding logging statements directly into the application’s source code. This can
be achieved using dedicated logging libraries or frameworks that provide structured ways to
output messages, such as Python’s logging module, Java’s Log4j or SLF4J, JavaScript’s Winston, or
Go’s log and zap.
These logs play a critical role during both development and production. They capture key runtime
information such as:
- Request identifiers (IDs) that track each user’s interaction across multiple microservices.
- User sessions to correlate user behavior and state.
- Error traces or stack traces that detail where and why exceptions occurred.
- Performance metrics, like the time taken to execute a database query or render a page.
- Business events, such as the successful completion of a payment or user registration.
Logs can be emitted at various severity levels — such as DEBUG, INFO, WARNING, ERROR, and
CRITICAL — allowing teams to filter and prioritize messages based on their importance. For
instance, DEBUG logs might be used only during development, while ERROR and CRITICAL logs are
actively monitored in production.
Structured logs, especially those in JSON format, make it easier to parse, index, and analyze logs
using tools like Elasticsearch or Loki. Moreover, contextual metadata — such as timestamps,
environment variables, function names, and user IDs — enables better log correlation, facilitating
tasks such as distributed tracing in microservice architectures.
In essence, application logs are more than just print statements — they are a window into the
application’s real-time behavior, helping engineers identify bugs, monitor usage, investigate
failures, ensure compliance, and improve the overall user experience.

System Logs
System logs, unlike application logs, are automatically generated by the operating system and its

core services, often without requiring any intervention from developers. These logs serve as the
foundation of infrastructure-level observability, providing insight into everything that happens
across the system from the kernel to user-space services.
In Linux environments, system logging is typically handled by logging daemons such as:
syslog
The traditional logging system that collects and stores messages from the kernel, system
services, and applications. It can forward logs to remote servers and supports filtering by
severity and facility.
rsyslog
An enhanced and more powerful version of syslog, offering better performance, filtering, and
structured logging support.
journald
A modern logging service (part of systemd) that stores logs in a binary format and provides
richer metadata, such as process IDs (PIDs), user IDs (UIDs), and service names. It allows for
precise querying via the journalctl command.
System logs capture a wide range of critical operational events, including:
- User logins and logouts, along with failed or successful authentication attempts (often tracked
via /var/log/auth.log).
- Kernel messages, such as hardware errors, system panics, or memory warnings (viewed with
dmesg or journalctl -k).
- Device failures, such as disk errors, bad blocks, or network interface issues.
- Service events, including daemon startups, shutdowns, restarts, crashes, and status changes
(e.g., tracked in /var/log/syslog, systemctl status, or journalctl -u servicename).
These logs are indispensable for system administrators, site reliability engineers (SREs), and
security teams. They provide essential visibility into the inner workings of an operating system,
enabling professionals to maintain system stability and security. One of the primary uses of
system logs is to detect unauthorized access attempts or suspicious login behavior, which is
crucial for maintaining security and compliance.
In addition, system logs are used to investigate performance degradation and identify situations
where system resources, such as CPU, memory, or disk I/O, are being exhausted. This allows teams
to take proactive steps before users are affected. Logs also help diagnose and respond to hardware
failures or kernel-level faults by capturing low-level events such as disk errors, memory warnings,

or kernel panics.
Another important function of system logs is to monitor the health and behavior of critical
services. Administrators rely on these logs to ensure that essential processes are running as
expected, restarting automatically if they crash, and reporting meaningful status messages when
something goes wrong. In this way, system logs act as a vital source of truth for understanding
and maintaining the operational integrity of servers and infrastructure.
System logs can also be centralized and aggregated using log forwarders like Fluentd, Logstash, or
Vector, making them accessible in log analysis platforms such as Elasticsearch, Splunk, or
Graylog2.
In short, system logging forms the nervous system of any modern IT infrastructure, enabling
visibility, security, and stability across all operating layers.

Architecture and Features of Open Source Logging Stacks
Managing logs from applications and systems is critical for monitoring performance,
troubleshooting issues, and ensuring compliance. Open source logging stacks provide powerful
tools to collect, process, store, and visualize logs efficiently. By understanding these tools and their
roles, teams can design scalable and cost-efficient logging solutions tailored to their needs.
A typical logging stack is built around three foundational components that work together to
ensure that logs are efficiently collected, stored, and analyzed.

Log Collection
The first component is log collection. This involves tools that automatically gather log data from
various sources, such as application code, system processes, containers, and network devices.
These collectors can be agents installed on the host system or integrated into the application itself.
They ensure that log data, regardless of its origin, is reliably captured and forwarded to a
centralized system for further handling.

Log Processing and Storage
The second critical component is log processing and storage. Once logs are collected, they often
need to be parsed, filtered, enriched, and transformed into a structured format like JSON. This
processing stage helps normalize logs from diverse sources and makes them easier to index and
search later. The processed logs are then stored in a database optimized for time-series or textbased data, allowing for high-performance querying and long-term retention. Systems like
Elasticsearch or Loki are commonly used in this stage because they support fast, full-text search

and indexing of large volumes of log data.

Log Visualization and Analysis
The third component is log visualization and analysis. This is where tools like Kibana, Grafana, or
Graylog2 come into play. These interfaces allow users to query logs, build dashboards, set up
alerts, and detect anomalies. They provide powerful visual representations and search capabilities
that make it easier for developers, operators, and security analysts to monitor system behavior,
troubleshoot issues, and gain actionable insights from raw log data. Together, these three
components form a comprehensive logging pipeline that supports observability, incident
response, and compliance across modern IT environments.

Open Source Logging Stacks
The following subsections examine each tool, with examples to illustrate their use.

Elasticsearch and OpenSearch
Elasticsearch and its fork, OpenSearch, are distributed search and analytics engines designed for
storing and querying large volumes of log data. They index logs to enable fast searches and
aggregations, making them ideal for log analysis at scale. Features include:
Scalability
Both Elasticsearch and OpenSearch support horizontal scaling, allowing them to handle
massive amounts of log data.
Full-text search
Logs can be queried using powerful text search capabilities.
Real-time analytics
Real-time indexing ensures that logs are immediately available for analysis.
As an example use case, imagine a web application that generates thousands of HTTP request logs
daily. Filebeat can collect these logs and send them to Elasticsearch for storage. Once indexed, the
following JSON example filters the logs to find all requests with a 500 status code, helping to
identify server errors quickly.
GET /logs/_search
"query": {
"match": {

"status_code": "500"

Logstash and Filebeat
Logstash and Filebeat are part of the Elastic stack and work together to ingest, process, and
forward logs.
Logstash is a powerful and flexible data processing pipeline that handles logs and event data. It
ingests logs from various sources, applies sophisticated filtering mechanisms — such as parsing
unstructured text, enriching fields with metadata, or transforming formats — and then routes the
processed data to a storage destination such as Elasticsearch. Its plugin-based architecture allows
for extensive customization and integration, making it ideal for environments that require
complex log transformations and centralized processing.
Filebeat, on the other hand, is a lightweight and efficient log shipper designed to collect log data
directly from log files on disk. It is commonly deployed on endpoints or servers where
applications generate logs, and it forwards this data to Logstash or Elasticsearch. Filebeat is
optimized for minimal resource usage, responds to backpressure, and includes built-in modules
for popular log types (like Nginx, Apache, and system logs), making it an excellent choice for
distributed log collection at scale.
As an example use case, imagine a microservices architecture where each service writes logs to
separate files. Filebeat can be deployed on each server to collect the logs and forward them to
Logstash for processing. The following YAML example specifies the logs as input:
filebeat.inputs:
- type: log
- /var/log/service/*.log
output.logstash:
hosts: ["logstash-server:5044"]

Logstash can parse logs into structured formats before sending them to Elasticsearch:
input {
beats {
port => 5044

filter {
grok {
match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level}
%{GREEDYDATA:message}" }
output {
elasticsearch {
hosts => ["http://elasticsearch:9200"]
index => "logs-%{+YYYY.MM.dd}"

This pipeline parses logs into the timestamp, level, and message fields, improving their usability
for analysis.
The Grok filter is a powerful Logstash plugin that extracts structured fields from unstructured log
data. Instead of writing raw regular expressions, Grok uses reusable patterns that are built on top
of regex. These patterns match and label specific portions of a log line — such as timestamps, log
levels, program names, or messages. This transformation makes raw logs easier to search,
visualize, and analyze in systems like Elasticsearch and Kibana, enabling more effective
monitoring and troubleshooting.
Here some examples of Grok patterns and what kinds of data they extract:
%{SYSLOGBASE}
<timestamp> <hostname> <program>[<pid>]
Extracts in syslog format
Apr 12 14:23:01 webserver sshd[1234]: Failed password for invalid user
admin from 192.168.1.100 port 22 ssh2
%{TIMESTAMP_ISO8601:timestamp}

timestamp
Extracts ISO 8601 timestamp (YYYY-MM-DDTHH:MM:SS)
2025-03-31T12:34:56
%{LOGLEVEL:level}
level
Extracts log level such as INFO, DEBUG, ERROR
ERROR
%{GREEDYDATA:message}
message
Extracts the entire remainder of the log line
User failed login attempt from 192.168
%{DATA:program}
program
Extracts the name of the program generating the log

nginx, sshd, mysql
%{SYSLOGTIMESTAMP:timestamp}
timestamp
Extracts syslog-style timestamp (Mar 31 10:12:45)
Mar 31 10:12:45

Fluentd and Fluent Bit
Fluentd is a highly versatile and reliable data collector for unified logging. It supports complex
workflows by collecting, filtering, transforming, and routing logs to various destinations such as
Elasticsearch, Kafka, or cloud storage services. Fluentd’s plugin ecosystem enables seamless
integration with a wide range of data sources and outputs, making it ideal for environments that
demand advanced log enrichment, routing logic, and scalability. Its ability to handle large
volumes of data reliably makes it a popular choice in production-grade logging pipelines.
Fluent Bit is a lightweight, high-performance log processor and forwarder built specifically for
environments with limited resources, such as Kubernetes clusters, edge computing devices, and
IoT systems. Despite its small footprint, Fluent Bit offers powerful features like in-memory
buffering, built-in filtering, and support for structured log formats such as JSON. It is often used as
a sidecar container in Kubernetes deployments to collect and forward container logs to
centralized logging systems. Fluent Bit is also fully compatible with Fluentd, allowing Fluent Bit to
serve as a lightweight agent that feeds into more complex Fluentd pipelines.
As an example use case, to collect logs from a Kubernetes cluster, Fluent Bit can be deployed as a
DaemonSet. The following Kubernetes configuration for this DaemonSet collects logs from
containers and forwards them to Elasticsearch:
kind: DaemonSet
name: fluent-bit

name: fluent-bit
name: fluent-bit
- name: fluent-bit
image: fluent/fluent-bit:latest
- name: varlog
mountPath: /var/log
- name: varlog
path: /var/log

The Fluent Bit configuration handling the logs follows:
[INPUT]
Name tail
Path /var/log/containers/*.log
Parser docker
[OUTPUT]
Name es
Match *
Host elasticsearch
Port 9200
Index logs

This setup ensures that all container logs are collected and stored in Elasticsearch for analysis.

Kibana
Kibana is a visualization tool that integrates with Elasticsearch to create dashboards, charts, and
reports. It provides an intuitive interface for exploring logs and metrics as well as interactive
dashboards to monitor key metrics, such as error rates or request latency. It filters raw logs on
specific criteria and offers sophisticated alerting mechanisms based on log patterns or thresholds.

As an example use case, Kibana can create a dashboard to monitor HTTP request logs. Such a
dashboard might show:
- A pie chart showing the distribution of HTTP status codes.
- A time-series graph tracking the number of requests over time.
- A table listing recent logs with errors.
Visualizing logs in this way can quickly identify trends and anomalies in an application’s
behavior.

Loki and Promtail
Loki is a cost-efficient log aggregation system inspired by Prometheus. Instead of indexing the
entire log content, Loki indexes only metadata (e.g., labels), reducing storage costs. Promtail is the
agent that collects logs and sends them to Loki. Features of these tools include integration with
Grafana for log exploration and visualization.
As an example use case, to monitor a Kubernetes cluster with Loki, Promtail can be deployed as a
DaemonSet to collect logs and send them to Loki. An example configuration for Promtail follows:
server:
http_listen_port: 9080
positions:
filename: /tmp/positions.yaml
clients:
- url: http://loki:3100/loki/api/v1/push
- job_name: system
- targets:
- localhost
job: varlogs
__path__: /var/log/*.log

Once logs are stored in Loki, they can be queried in Grafana using LogQL, Loki’s query language.
The following query retrieves all logs containing the word “error,” helping to troubleshoot issues
quickly.

{job="varlogs"} |= "error"

Graylog2
Graylog2 is a centralized logging platform that combines log collection, storage, and analysis.
Features include alerting, custom dashboards to visualize logs and metrics, and parsers,
extracting structured data from unstructured logs.
As an example use case, to monitor security events, Graylog2 can collect logs from firewalls and
intrusion detection systems. Its alerting feature can set up notifications for suspicious activities,
such as repeated failed login attempts.
In combination, the tools in this lesson can create end-to-end logging pipelines tailored to the
team’s needs. Whether monitoring a small application or a large-scale distributed system, these
open source solutions provide the foundation for effective observability and troubleshooting.

## 1. If Filebeat is installed and Logstash is running, what should you do to make Filebeat send logs
from a new file?

2. Which configuration section in Fluent Bit defines where logs should be sent?

3. How can Fluentd be used to transform logs before forwarding them?

4. How do you define a data source in Kibana?

## 5. Which component in Graylog2 is responsible for ingesting log messages?

1. A recently installed application writes log data to /opt/app/log/info.log. If Filebeat is
already installed and set up for communication with a remote Logstash instance, what has to
be done to submit the log data of the new application to Logstash?

## 2. You are working with Logstash and using the following Grok filter to parse log messages:
grok {
match => ["message", "%{SYSLOGBASE} new node %{IPORHOST:node}"]

Given this pattern, write a complete log message that would be correctly parsed by the filter
above. Your message should include:
- A standard syslog prefix (timestamp, hostname, and program name with optional PID).
- The literal string new node.
- A valid IP address or hostname to be captured as the field node.

Application and system logging are fundamental components for achieving observability,
maintaining performance, and ensuring security. Application logs, generated through code
instrumentation using libraries like Log4j or Python’s logging module, provide insights into user
activity, errors, and business logic execution. System logs, on the other hand, are automatically
generated by the operating system and services, capturing critical events such as kernel messages,
authentication attempts, and service status changes. These logs are essential for developers,
system administrators, and security teams to detect anomalies, troubleshoot issues, monitor
infrastructure health, and ensure operational compliance.
To manage the growing complexity and volume of logs, organizations employ open source logging
stacks that include tools such as Elasticsearch, Fluentd, Logstash, Kibana, Loki, and Graylog2.
These stacks typically involve three core components: log collection, log processing and storage,
and log visualization. Collectors like Fluent Bit and Filebeat gather logs from various sources.
Processors like Logstash or Fluentd transform and route data. Finally, visualization platforms like
Kibana or Grafana allow users to explore logs and identify patterns.

## 1. If Filebeat is installed and Logstash is running, what should you do to make Filebeat send logs
from a new file?
Add the file path to Filebeat’s paths section in filebeat.inputs, and restart the Filebeat
service.
2. Which configuration section in Fluent Bit defines where logs should be sent?
The [OUTPUT] section.
3. How can Fluentd be used to transform logs before forwarding them?
Use filters such as record_transformer to add or modify fields in log records.
4. How do you define a data source in Kibana?
Create an index pattern that matches the name of the Elasticsearch indices you want to
explore.
5. Which component in Graylog2 is responsible for ingesting log messages?
The Input component.

1. A recently installed application writes log data to /opt/app/log/info.log. If Filebeat is
already installed and set up for communication with a remote Logstash instance, what has to
be done to submit the log data of the new application to Logstash?
Filebeat uses inputs (formerly called “prospectors”) in its configuration file (filebeat.yml) to
define which files to monitor.
To include the new log data, edit the Filebeat configuration file (usually
/etc/filebeat/filebeat.yml). Under the appropriate filebeat.inputs section, add or
update the paths setting to include the new log file:
filebeat.inputs:
- type: log
enabled: true
- /var/log/*.log
- /opt/app/log/info.log

Restart Filebeat for the changes to take effect:
$ sudo systemctl restart filebeat

## 2. You are working with Logstash and using the following Grok filter to parse log messages:
grok {
match => ["message", "%{SYSLOGBASE} new node %{IPORHOST:node}"]

Given this pattern, write a complete log message that would be correctly parsed by the filter
above. Your message should include:
- A standard syslog prefix (timestamp, hostname, and program name with optional PID).
- The literal string new node.
- A valid IP address or hostname to be captured as the field node.
Let’s break down the Grok filter pattern:

%{SYSLOGBASE} new node %{IPORHOST:node}

The %{SYSLOGBASE} is a predefined grok pattern that matches standard syslog log
headers, such as:
<timestamp> <hostname> <program>[<pid>]:

Therefore, a sample message is:
Apr 12 14:23:01 webserver sshd[1234]: Failed password for
invalid user admin from 192.168.1.100 port 22 ssh2

### 704.4 Tracing
DevOps Tools Engineer v2.0, Exam 701, Objective 704.4
- Understanding the concepts of tracing
- Understanding the concepts of OpenTelemetry
- Awareness of commonly used open source telemetry analysis tools
- Awareness of application instrumentation
- OpenTelemetry
- Spans and Distributed Traces
- Contexts, Span and Trace IDs
- Span attributes, events, links, status and kind
- Grafana Tempo
- Jaeger

### 704.4 Tracing

In today’s cloud-native and microservices-based architectures, requests often travel across
multiple services, containers, and infrastructure layers. Understanding what happens during each
step of this journey is critical for ensuring performance, reliability, and maintainability. In short,
tracing is essential.
Tracing makes distributed systems more visible, by capturing detailed insights about each
request’s path, timing, and dependencies. It complements metrics and logs by showing how and
where delays or failures occur, making it a key component of modern observability.

Concepts of Tracing
Tracing gathers data about the path of a single request as it moves through different components
of a system. While metrics and logs provide snapshots and isolated messages, tracing offers an
end-to-end view of how components work together to handle a request.
Tracing provides critical observability into distributed applications, allowing developers to
understand how requests flow through systems, identify bottlenecks, and reduce latency.

Concepts like spans, traces, and context propagation form the building blocks of effective tracing.

Distributed Tracing and Spans
Distributed tracing follows requests across service boundaries, typically in a microservices
environment. When a request spans multiple services, each service generates its own trace data.
These trace fragments, called spans, are collected and linked together to form a complete trace of
the request lifecycle.
A span captures the details of a specific operation, such as a database query, an HTTP API call, a
background job, or a message sent to a queue. A span, therefore, is the fundamental building
block of a distributed trace. Each span represents a single, discrete unit of work performed as part
of a larger request or operation.
Each span contains metadata that makes it easier to analyze the flow of requests and identify
performance bottlenecks or errors. Components of a span include:
Operation name
A high-level description of what the span represents. Examples include:
- GET /api/users
- Database Query: SELECT * FROM users
Duration
The time that elapsed between the start and end timestamps. Duration is a critical metric for
identifying slow operations or performance issues.
Tags
Key-value pairs that provide additional context about the span. Tags help categorize and filter
spans during analysis. They are often used to include metadata and appear in the form:
- http.method=GET
- http.status_code=200
- db.statement=SELECT * FROM users
Logs or events
Timestamped annotations within a span that capture specific moments during the operation.
These logs provide granular details about what happened during the operation. Think of logs
and events as breadcrumbs or log entries that explain what’s happening inside a span at
specific points in time. Examples include:

- Query execution started
- Response received from database
- Payment Initiated (marking the moment a payment process begins)
A trace is a collection of spans and represents the full journey of a request. It starts at the entry
point (e.g., an API gateway) and continues across all the services involved in the request. A trace
allows developers to see the entire flow of execution and how long each part took.

Context Propagation
To correlate spans across distributed services, tracing relies on context propagation. This ensures
that trace IDs and span metadata are passed along with a request as it moves from one service to
another.
When a span is created, it is assigned a unique span ID that identifies that specific unit of work. It
distinguishes each operation and allows nesting (parent-child relationships).
Each span belongs to a larger trace, which is identified by a trace ID. These identifiers are
propagated between services using protocols such as HTTP headers (e.g., traceparent or b3) and
link together all spans involved in the same request.
A parent span ID points to the span that triggered the current span, forming a hierarchy.

Links
In tracing, a link connects a span to another span that is not its direct parent. In basic traces, spans
are organized in a tree-like structure with parent-child relationships. But in more complex
workflows, such as asynchronous jobs, message queues, or fan-in/fan-out patterns, a span could
relate to multiple sources or originate from parallel operations. These non-hierarchical
relationships can be preserved and represented through links.

Status
The status of a span provides a high-level summary of whether the operation represented by the
span was successful, failed, or encountered an error. This makes it easier to filter and identify
problematic operations within a trace. Common status codes include:
status.code = OK
Indicates that the operation completed successfully.

status.code = ERROR
Indicates that the operation failed due to an exception, timeout, or other error condition.

Kind
The kind of a span describes its role within a distributed trace. Available kinds include:
INTERNAL
Default value, used for operations that happen inside a process, like executng a function or
processing data.
SERVER
Marks spans that represent incoming requests handled by a server (e.g., receiving an API call).
CLIENT
Represents outgoing requests made to another service (e.g., calling a REST endpoint or
querying a database).
PRODUCER
Indicates that a message or event is being produced and sent (e.g., publishing to a message
queue).
CONSUMER
Used when a service is consuming or receiving a message or event (e.g., reading from a queue
or topic).
Understanding the kinds of spans helps to interpret traces more accurately, especially when
analyzing the interaction between services. For instance, a CLIENT span followed by a SERVER
span indicates a service-to-service call. A PRODUCER followed later by a CONSUMER are most likely
part of a message-passing architecture.

Example of Distributed Tracing in Action
Distributed tracing is a powerful technique for monitoring and analyzing requests as they flow
through a distributed system. The following example helps show how tracing works.
Imagine that a user visits an e-commerce platform and searches for a product. The request flows
through multiple services, including the API gateway, product service, inventory service, and
database. Each step in this process is represented by a span, and the entire journey is captured as
a trace.

The process begins when the user sends a GET /products/456 request to the platform. This
request is the starting point of the trace and is represented by a root span.
The API gateway receives the request and processes it, creating a child span to represent the
gateway’s processing. This span includes metadata such as the HTTP method (GET) and the
endpoint (/products/456).
After processing the request, the API gateway forwards it to the product service. Another child
span is created to represent this operation: Fetch Product Details.
The product service queries the database to retrieve details about product 456. This database
query is represented by yet another child span: Database Query: SELECT * FROM products
WHERE id = 456.
After all operations are complete, the API gateway compiles the results and sends the response
back to the user. The root span is marked as complete, and the entire trace is stored for analysis.
When visualized in a tool like Jaeger or Grafana Tempo, the trace appears as a hierarchical
timeline of spans:
Trace: GET /products/456
├── Span: API Gateway Processing

├── Span: Fetch Product Details

├── Span: Check Inventory for Product 456

├── Span: Database Query: SELECT * FROM products WHERE id = 456

This visualization makes it easy to identify which operations took the longest or encountered
errors. Each span includes its start and end times, duration, and any associated metadata.

Application Instrumentation
To enable distributed tracing, applications must be instrumented to generate trace data. This data
is critical for observability, allowing developers, DevOps engineers, and SREs to understand how
applications behave in real time, identify performance issues, and gain visibility into user
interactions. Application instrumentation involves adding code or using libraries that
automatically create and propagate spans while requests flow through services. Instrumentation
is a fundamental requirement for building reliable, scalable, and debuggable systems.

How Instrumentation Works
Instrumentation can be done manually or in automated fashion.

Manual instrumentation requires developers to explicitly add telemetry code to their application
using logging frameworks, metrics libraries, or tracing SDKs.
For example, a developer might add code to log when a database query is executed or to start a
span when an HTTP request is made. This approach provides full control and customization,
allowing engineers to record business-specific events and add contextual metadata.
Automatic instrumentation, on the other hand, uses middleware, agents, or instrumentation
frameworks to insert telemetry code without modifying the application’s source code. Tools like
OpenTelemetry offer auto-instrumentation packages for popular frameworks such as Node.js
Express, Java Spring, and Python’s Flask. This enables teams to begin collecting traces and metrics
with minimal effort.
Instrumentation libraries typically provide APIs for logging (logger.info()), defining metrics
(histogram.observe()), and managing spans (tracer.startSpan()). When instrumented
properly, applications can expose metrics such as request duration, error rate, CPU usage, and
throughput. This data can then be collected by observability backends such as Prometheus,
Grafana, Tempo, and Jaeger.
One of the most important developments in application instrumentation is the rise of
OpenTelemetry, a vendor-neutral and open source framework for collecting and exporting
telemetry data. OpenTelemetry supports traces, metrics, and logs, offering SDKs and autoinstrumentation packages for many programming languages.
Other widely-used instrumentation libraries include Prometheus Client Libraries (e.g., promclient for Node.js, prometheus_client for Python), Datadog’s APM SDKs, and Zipkin libraries.
These tools allow developers to instrument custom events, define latency histograms, and capture
high-cardinality data like user IDs or endpoint names.

OpenTelemetry
OpenTelemetry is a vendor-neutral, open source observability framework for collecting,
processing, and exporting telemetry data such as traces, metrics, and logs. OpenTelemetry
standardizes the way telemetry data is collected, processed, and exported across distributed
systems. It originated as a unification of two projects: OpenTracing and OpenCensus.
OpenTelemetry provides:
- Instrumentation libraries for many programming languages
- APIs and SDKs to create spans and traces
- Auto-instrumentation agents for popular web frameworks and databases

- Exporters to send telemetry data to back ends like Jaeger, Zipkin, and Grafana Tempo
With OpenTelemetry, developers can instrument their code using a consistent API and export the
data to multiple backends without rewriting the instrumentation logic. For example, an
application using OpenTelemetry can send traces to Jaeger, metrics to Prometheus, and logs to a
centralized logging system — all with minimal configuration.
The OpenTelemetry architecture is built on several core components, each playing a vital role in
ensuring that observability data is consistently captured and made available for analysis,
regardless of the underlying platform or technology stack.
As explained earlier, a crucial part of distributed tracing is context propagation, which ensures
that trace context — such as the trace ID and span ID — is maintained as a request flows through
multiple services. Context propagation enables full trace reconstruction across services, allowing
teams to visualize end-to-end request flows. OpenTelemetry implements standardized
propagation formats (such as W3C Trace Context) and APIs to inject and extract this metadata
across communication protocols (such as HTTP, gRPC, and message queues).
The OpenTelemetry Specification
The OpenTelemetry specification defines the cross-language requirements and expectations that
all OpenTelemetry implementations must follow. It ensures consistency, interoperability, and
clarity across different programming languages and environments.
Rather than just defining terminology, the specification provides a detailed structure around three
core components:
API
This layer has language-agnostic behavior but is implemented separately in each programming
language, providing developers with a consistent and minimal surface to instrument their
applications.
SDK
The SDK is responsible for efficiently managing and exporting telemetry data, while also being
customizable and extensible for different environments and use cases.
Data
This part of the specification defines the OpenTelemetry Protocol (OTLP), which is a
standardized, high-performance, and extensible protocol for transmitting traces, metrics, and
logs between collectors, agents, and observability backends. It also defines semantic
conventions, which provide a set of vendor-agnostic names and values for attributes (e.g.,

http.method, db.system, net.peer.ip). These conventions promote consistency and make
telemetry data easier to query, analyze, and understand.
Collector
The Collector is at the heart of OpenTelemetry’s data pipeline. It is a vendor-neutral agent or
gateway that can receive telemetry data from multiple sources — including instrumented
applications, agents, or other collectors — and apply processing logic before exporting the data to
observability backends. The Collector is modular and extensible, featuring three key stages:
- Receivers ingest data from various sources.
- Processors modify, filter, or enrich data.
- Exporters send data to external systems.
This modularity enables scalable and centralized telemetry pipelines without tying applications to
specific vendors.
Back ends are observability platforms that receive telemetry data for storage, querying,
visualization, and alerting.
Instrumentation
Instrumentation enables applications to emit telemetry data. OpenTelemetry supports automatic
instrumentation via agents or hooks, and manual instrumentation using language-specific SDKs
(e.g., Java, Python, Go, JavaScript).
Developers can embed trace spans, record logs, and capture performance metrics along with
contextual metadata such as request IDs, session details, and response times. This data helps with
root cause analysis, performance tuning, and debugging.

Distributed Tracing with Jaeger and Grafana Tempo
As
systems
grow
more
complex
and
distributed — especially
in
microservices
architectures — understanding the flow of requests across services becomes increasingly difficult.
This is where distributed tracing tools like Jaeger and Grafana Tempo play a crucial role. Both are
open source tracing back ends designed to ingest, store, and visualize traces. They make it easier
for developers and operators to diagnose latency issues, debug failures, and monitor service
interactions.

Jaeger: Open Source Distributed Tracing System
Jaeger is a distributed tracing system originally developed by Uber and now part of the Cloud
Native Computing Foundation (CNCF). It allows users to track a request as it travels through a
microservice-based system. This includes visualizing spans, identifying performance bottlenecks,
and understanding service dependencies. Jaeger supports standards like OpenTracing and
OpenTelemetry and can be used with many programming languages and frameworks.
A typical Jaeger architecture includes instrumentation in applications, often via OpenTelemetry
SDKs. These applications send trace data to an OpenTelemetry Collector or directly to a Jaeger
Agent. The data then flows into the Jaeger Collector, is stored in a backend like Elasticsearch or
Cassandra, and can be queried via the Jaeger UI. This interface allows users to explore traces
based on service name, duration, operation, or custom tags.
For example, in an e-commerce application, a user request to place an order might involve
multiple services: the frontend, order processor, inventory manager, and payment gateway. Each
of these generates a span, and all spans are grouped into a trace.
Using Jaeger, an engineer can trace the request end-to-end, identify which component introduced
latency, and drill down to the exact cause — be it a slow database call or an error in a remote API.

Grafana Tempo: Lightweight and Scalable Tracing
Grafana Tempo is a high-scale, cost-efficient tracing backend developed by Grafana Labs. Unlike
traditional tracing systems, Tempo avoids indexing the contents of trace data. Instead, it just
indexes trace IDs and stores trace payloads in object storage solutions such as S3, GCS, or Azure
Blob. This design drastically reduces infrastructure cost and simplifies scaling.
Tempo integrates natively with Grafana, enabling seamless correlation of logs, metrics, and traces
within a single user interface. It works well with the OpenTelemetry Collector, which receives
spans from instrumented services and forwards them to Tempo.
Once stored, traces can be retrieved using trace IDs found in logs (e.g., from Loki) or dashboards
(e.g., from Prometheus metrics). This workflow enhances root cause analysis and supports
efficient incident response.
Consider a scenario where a video streaming platform receives complaints about long load times.
Using Grafana and Tempo together, a developer can first identify the affected user session
through logs in Loki, extract the trace ID, and use it to pull the full trace from Tempo. The trace
might reveal that the video service suffered a cache miss, which caused additional latency in
fetching content from a remote database. This insight allows the developer to pinpoint the
problem quickly and resolve it with minimal disruption.

1. A request goes through the following services: Frontend - Order Service - Payment Service Third-Party Gateway. Each step is tracked using OpenTelemetry. Which OpenTelemetry
concept describes this full request path, and what is the role of each service’s tracking unit?
