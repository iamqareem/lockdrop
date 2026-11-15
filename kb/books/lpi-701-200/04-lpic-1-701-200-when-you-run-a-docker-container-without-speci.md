---
id: lpi-701-200-04
title: "LPIC-1 · 701-200 — When you run a Docker container without specifying a network…",
slug: lpi-701-200-04-lpic-1-701-200-when-you-run-a-docker-container-without-speci
source: "LPI Learning Material — LPIC-1 (Exam 701-200)",
sourceSection: "1. When you run a Docker container without specifying a network, which network driver is used, 2. You need two containers to communicate using container names. What kind of network should, 1. You have two containers. One is a Node.js API server named api-server and the other is a, 2. You created a n"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "PostgreSQL database named pg-db. Covers 33 sections: When you run a Docker container without specifying a network, which network driver is used, You need two containers to c.",
---
# LPIC-1 · 701-200 — When you run a Docker container without specifying a network…

## 2. You need two containers to communicate using container names. What kind of network should
you create, and how?

3. How can you remove all Docker volumes that are no longer used by any container?

4. How can you make two containers share a common data directory?

5. How do you create a volume called mydata, use it in a container, and then remove it?

## 1. You have two containers. One is a Node.js API server named api-server and the other is a
PostgreSQL database named pg-db. You placed both containers on Docker’s default bridge
network without exposing any ports. Why might api-server be unable to connect to the host
pg-db using its hostname? What solution would enable seamless communication between
these two containers?

## 2. You created a named volume called myvol and used it in a container that writes logs to
/app/logs. After stopping and removing the container, you run a new container with the
same volume but see the old log files still there. Why do the log files persist even though the
original container was deleted? How can you inspect what’s inside the volume from outside the
container?

## 3. You have run an NGINX container using the following command:
$ docker run -d --name web nginx

The container starts successfully, but when you open a browser and navigate to
http://localhost, you get a connection error. Why can’t you access the NGINX web server
from your browser? What should you change to fix the issue?

Docker networking and storage are foundational to building reliable containerized applications.
Docker offers several network drivers, including bridge, host, and overlay. Each is suited for
specific scenarios, from isolated local setups to multihost communication in Swarm clusters.
Features such as DNS-based service discovery and encrypted overlay networks enhance
connectivity and scalability.
On the storage side, Docker supports volumes, bind mounts, and tmpfs mounts. Volumes provide
persistent, portable data storage ideal for production use, while bind mounts are useful during
development. tmpfs mounts store data in memory for sensitive information needed during the
lifetime of the container. Combined with rootless containers, these features ensure flexibility,
security, and efficient resource use.

## 1. When you run a Docker container without specifying a network, which network driver is used
by default?
The default network is the bridge network. Docker automatically connects containers to the
default bridge network if no other network is specified.
2. You need two containers to communicate using container names. What kind of network should
you create, and how?
You should create a user-defined bridge network using:
$ docker network create mynet

Then run containers with:
$ docker run -d --name app1 --network mynet myapp1
$ docker run -d --name app2 --network mynet myapp2

3. How can you remove all Docker volumes that are no longer used by any container?
$ docker volume prune

## 4. How can you make two containers share a common data directory?
First, create a shared volume:
$ docker volume create shared-data

Then mount it into both containers:
$ docker run -d --name app1 -v shared-data:/app/data my-image1
$ docker run -d --name app2 -v shared-data:/app/data my-image2

5. How do you create a volume called mydata, use it in a container, and then remove it?
Create and attach the volume:

$ docker volume create mydata
$ docker run -d --name myapp -v mydata:/data myimage

Before removing the volume, first stop and delete the container:
$ docker stop myapp
$ docker rm myapp
$ docker volume rm mydata

## 1. You have two containers. One is a Node.js API server named api-server and the other is a
PostgreSQL database named pg-db. You placed both containers on Docker’s default bridge
network without exposing any ports. Why might api-server be unable to connect to the host
pg-db using its hostname? What solution would enable seamless communication between
these two containers?
On the default bridge network, Docker does not provide automatic DNS resolution using
container names. Therefore, api-server cannot resolve the hostname pg-db unless DNS is
configured manually.
A better solution is to create a user-defined bridge network, which enables auomatic DNSbased service discovery. Therefore, fix the problem as follows:
$ docker network create app-network
$ docker run -d --name pg-db --network app-network postgres
$ docker run -d --name api-server --network app-network my-api-image

Now the api-server container can connect to the host pg-db using its hostname, thanks to
Docker’s internal DNS system for user-defined networks.
2. You created a named volume called myvol and used it in a container that writes logs to
/app/logs. After stopping and removing the container, you run a new container with the
same volume but see the old log files still there. Why do the log files persist even though the
original container was deleted? How can you inspect what’s inside the volume from outside the
container?
Named volumes are persistent and decoupled from container lifecycles. Deleting a container
does not remove its associated volumes unless explicitly instructed to do so. That’s why the old
log files still exist.
To inspect the volume from the host, you can use another temporary container to mount the
volume and access its contents:
$ docker run --rm -v myvol:/data busybox ls /data

## 3. You have run an NGINX container using the following command:

$ docker run -d --name web nginx

The container starts successfully, but when you open a browser and navigate to
http://localhost, you get a connection error. Why can’t you access the NGINX web server
from your browser? What should you change to fix the issue?
By default, Docker containers on the bridge network do not expose their internal ports to the
host unless explicitly mapped. In this case, although NGINX is running and listening on port 80
inside the container, the host has no way to access it, because no port mapping was configured.
To fix the issue, map the container’s internal port to a host port using the -p option:
$ docker run -d --name web -p 80:80 nginx

Now, visiting http://localhost will work, as port 80 inside the container is mapped to port
80 on your host machine.

### 702.2 Container Orchestration
DevOps Tools Engineer v2.0, Exam 701, Objective 702.2
- Understand the application model of Docker Compose and Podman Compose
- Create and run Docker Compose Files (version 3 or later)
- Define services, networks and volumes, along with their commonly used properties, in
Docker Compose files
- Use Docker Compose to update running containers to newer images
- docker compose
- podman-compose
- docker-compose.yml

### 702.2 Container Orchestration

Containerized environments need efficient management of multi-container applications. Docker
Compose and Podman Compose simplify management by consulting YAML configuration files to
define, run, and manage applications.
In this lesson, you will explore the application model of Docker Compose and Podman Compose,
learn how to create and run Docker Compose files, define services, networks, and volumes along
with their commonly used properties, and use Docker Compose to update running containers with
newer images. It also describes key files and tools such as docker compose, podman compose,
compose.yaml, and docker-compose.yml, which play a central role in orchestrating
containerized applications with ease.

Application Model for Docker Compose and Podman Compose
Modern applications are rarely built as single containers. They typically consist of multiple
services — such as databases, APIs, message brokers, and front end web servers — that need to
run together and communicate with each other. This is where tools such as Docker Compose and
Podman Compose come in. They provide a simplified, declarative way to define and manage multi-

container applications, making development and orchestration much more efficient.
Both Docker Compose and Podman Compose allow developers to describe a complete application
stack in a single file called compose.yaml, specifying how each containerized service should be
built, configured, networked, and started. Instead of launching each container manually with long
docker run commands, Compose automates the process using a configuration-driven model.
NOTE

This lesson refers to version 3 or later of Docker Compose.

The Compose configuration file should be located in the project’s working directory — that is, the
directory where the application’s source code and related configuration files reside. The preferred
file name is compose.yaml, although compose.yml is also accepted. For backward compatibility
with older setups, Docker Compose will also recognize the legacy names docker-compose.yaml
and docker-compose.yml.
If multiple Compose files exist in the same directory, Docker Compose gives priority to the
canonical compose.yaml file.

YAML
YAML (YAML Ain’t Markup Language) is a human-readable data serialization format often used
for configuration files. For instance, YAML appears in Docker Compose, Kubernetes manifests,
GitHub Actions, Ansible playbooks, and many CI/CD systems. Its simple and clean syntax makes it
easy to write and understand, compared to other data formats such as XML or JSON.
YAML uses indentation to represent data structure, meaning that whitespace is syntactically
significant — much like how Python relies on indentation. Incorrect indentation can cause Docker
Compose to misinterpret or reject the file entirely.

TIP

To avoid such issues, it is highly recommended to configure the text editor with
proper visual cues. In Vim, for instance, enabling cursor highlighting (both
horizontally and vertically) helps detect indentation problems early.

A YAML parser can detect only syntax problems, such as missing colons or unmatched brackets.
However, yamllint goes further — it is a static analysis tool for YAML files that checks for both
syntax and style issues, ensuring clean, consistent, and well-formatted YAML.
Beyond detecting errors, yamllint also enforces best practices and formatting rules, such as
indentation depth, line length, and key alignment, which are especially important in collaborative
projects or automated pipelines.

Docker Compose
Docker Compose is a tool developed by Docker that lets you define and manage multi-container
applications using a YAML file. Each service in the YAML file represents a container. You can
specify image names, build contexts, environment variables, mounted volumes, ports to expose,
and even network configurations.
The easiest and recommended way to install Docker Compose is by using Docker Desktop, which
includes all necessary components such as Docker Compose, Docker Engine, and the Docker
command-line interface (CLI). This all-in-one solution simplifies the setup process and ensures
compatibility across systems. Docker Desktop is available for Linux, macOS, and Windows.
To verify that Docker Compose is installed and available on the system, check its version with:
$ docker compose version

After Docker Compose is installed and verified, the next step is to define a compose.yaml file that
specifies the services, networks, and volumes required by the application.
This YAML file acts as a blueprint for a multi-container environment, describing how different
components interact and start together.
For instance, the following compose.yaml defines a simple setup with two services — a web
server running NGINX and a PostgreSQL database. Both services can be launched simultaneously
with a single command: docker compose up.
version: '3.8'
image: postgres:14
POSTGRES_PASSWORD: example
- db-data:/var/lib/postgresql/data

This file defines two services: an NGINX web server and a PostgreSQL database.
The version field specifies that the configuration uses version 3.8 of Docker Compose. It
determines the format and features available in the file, along with the syntax and capabilities
Docker Compose will understand when parsing the file.
However, as of Compose specification v3.9+ (and Docker Compose v1.27.0+), the version field is
now optional and obsolete, because Docker Compose has moved toward a unified Compose
specification maintained by the Compose Specification project. This new approach makes
Compose files more consistent across platforms like Docker and Podman.
The first service, called web, uses the latest Nginx image and maps port 80 inside the container to
port 8080 on the host machine. This means you can access the Nginx server by opening
http://localhost:8080 in your browser.
The second service, db, uses version 14 of the PostgreSQL image. It sets an environment variable
called POSTGRES_PASSWORD with the value example, which defines the password for the default
PostgreSQL user.
The application is using a named volume called db-data to persist PostgreSQL data. The first part
(typically inside a service named db) mounts this volume to the container path
/var/lib/postgresql/data, which is where PostgreSQL stores its database files. This ensures
that the data inside the database is stored outside the container, in a persistent volume managed
by Docker.
The second part at the root level of the Compose file — near the bottom of the example — declares
the volumes. This tells Docker Compose to create the db-data volume automatically if it doesn’t
already exist. This setup is crucial for maintaining data across container restarts, rebuilds, or even
system reboots. Without this, any data stored in the database would be lost when the container is
removed.
This configuration is useful for quickly running a web server with a database using containers,
and it is a common starting point for many web applications.
To start the multi-container application defined in the compose.yaml file, navigate to the project
directory and run:
$ cd myapp
$ docker compose up -d
[+] Running 22/22

✔ db Pulled

12.2s

✔ 6e909acdb790 Pull complete

2.5s

✔ web Pulled

10.3s

✔ 5eaa34f5b9c2 Pull complete

7.5s

[+] Running 3/3
✔ Network myapp_default

Created

0.1s

✔ Container myapp-web-1

0.9s

✔ Container myapp-db-1

0.9s

The -d option starts the containers in detached mode, allowing them to run in the background.
Docker Compose automatically creates a dedicated network (myapp_default) and launches each
service defined in the configuration file.
Once the setup completes, the application is fully operational and accessible according to the
defined port mappings.
These commands automatically create a network, pull the required images, start containers, and
link them so they can communicate using service names (web, db).
By default, Docker Compose assigns the project name based on the directory containing your
compose.yaml file. This project name serves as a prefix for resources such as containers,
networks, and volumes, ensuring isolation between different environments.
Enter http://localhost:8080/ in a browser to see the application running. Alternatively, you
can retrieve the URL using curl in the terminal:
$ curl http://localhost:8080

To run your services in the background, pass the -d option (for “detached” mode) to docker
compose up and use docker compose ps to see what is currently running:
$ docker compose ps

COMMAND

SERVICE

CREATED

myapp-db-1

postgres:13

"docker-entrypoint.s…"

db

5 seconds ago

Up 4 seconds

nginx:latest

"/docker-entrypoint.…"

web

5 seconds ago

Up 4 seconds

5432/tcp
myapp-web-1

0.0.0.0:8080->80/tcp, [::]:8080->80/tcp

This output lists all containers managed by the Compose project, showing their assigned names,
corresponding images, commands, services, creation times, current statuses, and exposed ports.
The table confirms that both the Nginx web service and the PostgreSQL database are running
successfully.
To monitor the output of all running services in real time, use the logs command with the -f
(“follow”) option:
$ docker compose logs -f

This continuously streams the combined logs of all services, helping with troubleshooting and
real-time monitoring.
When the application is no longer needed, stop and remove all containers, networks, and volumes
created by the up command with:
$ docker compose down

Docker Compose also allows assigning a custom project name. By default, the project name is
derived from the directory name, but it can be overridden with the -p option. This is useful when
managing multiple Compose environments on the same system:
$ docker compose -p myproject up -d
[+] Running 3/3
✔ Network myproject_default

Created

0.1s

✔ Container myproject-db-1

0.4s

✔ Container myproject-web-1

0.5s

Using the -p flag keeps container, network, and volume names organized and easily identifiable
by project.

Podman Compose
Podman Compose provides functionality equivalent to Docker Compose but operates in Podman-

based environments.
It reads the same compose.yaml file format and orchestrates containers, networks, and volumes
using Podman instead of Docker.
Like Docker Compose, it automates the process of building, configuring, and launching multiple
containers that form a single application stack — managing inter-service communication,
environment variables, and persistent data storage.
Starting with Podman version 4.7.0 (and in Podman Desktop), the podman compose command is
included by default, so no additional installation is required:
$ podman compose up -d

For older versions of Podman, the standalone podman-compose package must be installed
separately, as it is not bundled with the core Podman utility. In such environments, the equivalent
command becomes:
$ podman-compose up -d

Both tools are compatible with the same Compose file format, providing a consistent workflow
across Docker and Podman ecosystems.

Defining Services, Networks, and Volumes in Docker Compose
Docker Compose defines three essential building blocks for containerized applications: services,
networks, and volumes.
Each section of the compose.yaml file can be customized with specific properties that describe
how containers interact, communicate, and persist data.
Together, these elements form the declarative model that allows Docker Compose to deploy and
manage complex, multi-container environments with a single configuration file.

Services
A service represents an abstract definition of a computing resource within an application. Each
service can be scaled or replaced independently of other components. Each service is backed by
one or more containers that run the same image and are managed by the platform based on
replication rules and placement constraints. Since services rely on containers, they are defined

using a Docker image along with a set of runtime parameters. All containers within a service are
created identically using these parameters.
In a Compose file, services are defined under the top-level services key, which is a map where
each key represents the name of a service and its corresponding value defines the service
configuration. This configuration ensures uniformly to all containers launched by the service.
Optionally, a service can include a build section that specifies how to build the Docker image for
that service. Compose supports image building directly from this definition.
You can configure how the container behaves using properties such as:
image
Docker image to use
build
path to a Dockerfile to build the image
ports
mapping of ports between the container and the host
volumes
volumes or bind mounts to mount on the host
environment
environment variables and their settings
depends_on
startup order
networks
network for communication
restart
restart policy (always, on-failure, unless-stopped, etc.)
The following example illustrates the structure of a compose.yaml file and explains the main
configuration elements of a simple web service:

- web-data:/usr/share/nginx/html
- NGINX_HOST=localhost
- frontend
web-data:
frontend:

This configuration demonstrates how Docker Compose ties together multiple configuration
aspects:
Service (web)
describes how the container runs — including image source, port mappings, and restart policy.
Volume (web-data)
ensures data persistence between container restarts.
Network (frontend)
provides an isolated communication channel between containers that belong to the same
application stack.
This modular design allows applications to remain portable, consistent, and easy to manage
across environments.

Networks
The top-level networks section in a compose.yaml file defines named networks that can be
shared among multiple services. Containers attached to the same network can communicate
directly using service names as hostnames, leveraging Docker’s built-in DNS resolution.
Each service that participates in a custom network must explicitly declare its connection to it
under the networks attribute. This explicit association ensures that only authorized services can
communicate within that network, improving isolation and security.

The top-level networks element also provides advanced configuration options for more granular
control of network behavior. If no custom network is defined, Docker Compose automatically
creates a default network, but defining custom ones offers greater flexibility and control over
communication patterns.
Common network properties include:
driver
specifies which network driver to use (for example, bridge, overlay, or macvlan).
ipam
allows customization of IP address management, including subnet, gateway, and static IP
assignments.
external
indicates that the network already exists outside the current Compose file and should not be
created by Compose.
driver: overlay

In this example, the network named db-data uses the overlay driver, suitable for distributed
environments such as Docker Swarm or multi-host setups.
Only services connected to this network can communicate with each other, providing isolation
and predictable connectivity between application components.

Volumes
Volumes provide a mechanism for persistent data storage managed by the container engine.
Docker Compose offers a portable and consistent way to define and attach these volumes to
services, ensuring that important data — such as logs, databases, or uploaded files — remains
available even after containers are stopped or removed.
The top-level volumes section in a compose.yaml file is used to define and name reusable
volumes.
Each service that requires access to persistent data must explicitly reference one of these defined
volumes under its own volumes attribute. This structure provides a clean separation between
volume declaration and volume usage, making the setup easier to maintain and reuse across

different environments.
Common properties for volumes include:
driver
specifies the volume driver to use (for example, local, nfs, or a cloud driver).
external
indicates that the volume was created outside the current Compose file and should not be
automatically managed by Compose.
name
assigns a custom name to the volume, allowing consistent identification across multiple
projects.
Basic example of defining a volume:

To use the defined volume in a service, reference it in the service configuration as follows:
- db-data:/var/lib/postgresql/data

In this setup, all PostgreSQL data stored inside the container’s /var/lib/postgresql/data
directory is persisted in the db-data volume.
Even if the container is stopped or removed, the database files remain intact, ensuring data
durability across container restarts or image updates.

Full Compose File Example
The following compose.yaml file demonstrates a complete multi-service application that includes
a web front end, an application backend, and a database. Each service is defined with its own
configuration, dependencies, networks, and persistent storage:

image: nginx:alpine
- web-data:/usr/share/nginx/html
- frontend
restart: always
app:
build: ./app
depends_on:
- db
- FLASK_ENV=development
- "5000:5000"
- backend
restart: always
image: postgres:14
- db-data:/var/lib/postgresql/data
- POSTGRES_USER=admin
- POSTGRES_PASSWORD=admin123
- POSTGRES_DB=maindb
- backend
restart: always
web-data:
frontend:
backend:

This compose.yaml file defines a typical multi-container application architecture offering three
services: web, app, and db.

The web service uses the lightweight nginx:alpine image to serve static content, mapping port
80 inside the container to port 8080 on the host. It mounts a named volume called web-data to the
Nginx HTML directory and connects to a custom network named frontend.
The app service builds its image from a local ./app directory — presumably containing a Flask
application — and defines the environment variable FLASK_ENV=development. The configuration
includes a depends_on attribute referring to the db service, to ensure that the database starts
first. It also exposes port 5000 and is connected to the backend network.
The db service uses the official postgres:14 image and mounts a volume named db-data to
persist data. It is configured with standard environment variables for username, password, and
database name, and is also connected to the backend network.
All services have a restart policy set to always, ensuring they automatically restart if they stop
unexpectedly.
Two named volumes, web-data and db-data, and two networks, frontend and backend, are
declared at the top level to provide persistent storage and structured communication between
services.

Using Docker Compose to Update Running Containers to Newer Images
Using Docker Compose, you can efficiently update your running containers to newer versions of
their images, ensuring that your application stays current with the latest features, fixes, and
security patches. This process involves pulling the updated image and recreating the containers
based on your existing compose.yaml configuration.
Imagine you have PostgreSQL version 13 running as a service defined in your compose.yaml file,
like this:
image: postgres:13
POSTGRES_PASSWORD: example

To update the services defined in a compose.yaml file to their latest available image versions,
first ensure that the newest images are downloaded from their respective registries. This step
refreshes the local cache with the most recent builds of each image used by the project:

$ docker compose pull

The docker compose pull command downloads the latest versions of the images defined in the
Compose file without restarting any running containers. After updating the images, the containers
must be recreated to apply the new versions:
$ docker compose up -d

When executed after a pull, the up command automatically detects image updates and replaces
the currently running containers with new instances built from the latest versions. This ensures
that services remain current without requiring a complete teardown of the environment.
For more granular control, the following options can be used:
--no-deps
recreates only the specified service containers, leaving their dependencies untouched.
--force-recreate
forces the recreation of containers even if the configuration or image has not changed.
After the update, to remove outdated and unused image layers from the system and free up disk
space, execute:
$ docker image prune

Following this workflow keeps the deployment environment up to date, lightweight, and secure,
avoiding unnecessary accumulation of obsolete images and containers.

## 1. Write a compose.yaml file that defines a service named web using the image nginx:latest
and that exposes port 8080 on the host, mapped to port 80 in the container.

## 2. Extend the compose.yaml file to include a db service using the image mariadb:latest, set a
password using an environment variable, and mount a volume to persist data.

## 3. Update the web service to include the unless-stopped restart policy and set the environment
variable NGINX_HOST to the value localhost.

## 1. Create a compose.yaml file that runs a basic WordPress site with a MariaDB back end. The
wordpress service should use the image wordpress:latest, expose port 8080 on the host, and
connect to the database via environment variables. The db service should use the image
mariadb:latest, set the root password, and persist data using a named volume. Both services
must be on the same custom network called wp-network.

## 2. What happens when you run docker compose down with additional parameters such as
--volumes or --rmi all?

## 3. You have a compose.yaml file that defines a simple web service using the nginx:alpine
image. Your goal is to run three replicas of the web service using Docker Compose. Create a
basic compose.yaml with the web service and use a Docker Compose command to scale the
service to three instances.

Docker Compose and Podman Compose provide a powerful and declarative way to define and run
multi-container applications using a single YAML file. This file describes how different
services — like web servers, databases, and backend apps — should be built, configured,
connected through networks, and launched.
Each service in a Compose file can be finely controlled through properties such as image and
version, ports, environment variables, volumes, and dependencies. Services can be scaled
independently and linked together securely through custom networks. Podman Compose offers
the same experience in Podman-based environments, with support for the same file format and
similar commands. Compose promotes efficiency, consistency, and maintainability in
containerized development workflows.

## 1. Write a compose.yaml file that defines a service named web using the image nginx:latest
and that exposes port 8080 on the host, mapped to port 80 in the container.

## 2. Extend the compose.yaml file to include a db service using the image mariadb:latest, set a
password using an environment variable, and mount a volume to persist data.
image: mariadb:latest
- MARIADB_ROOT_PASSWORD=example
- db-data:/var/lib/mysql

## 3. Update the web service to include the unless-stopped restart policy and set the environment
variable NGINX_HOST to the value localhost.
- NGINX_HOST=localhost

image: mariadb:latest
- MARIADB_ROOT_PASSWORD=example
- db-data:/var/lib/mysql

## 1. Create a compose.yaml file that runs a basic WordPress site with a MariaDB back end. The
wordpress service should use the image wordpress:latest, expose port 8080 on the host, and
connect to the database via environment variables. The db service should use the image
mariadb:latest, set the root password, and persist data using a named volume. Both services
must be on the same custom network called wp-network.
wordpress:
image: wordpress:latest
- WORDPRESS_DB_HOST=db
- WORDPRESS_DB_USER=root
- WORDPRESS_DB_PASSWORD=example
- WORDPRESS_DB_NAME=wordpress
- wp-network
image: mariadb:latest
- MARIADB_ROOT_PASSWORD=example
- MARIADB_DATABASE=wordpress
- db-data:/var/lib/mysql
- wp-network
wp-network:

## 2. What happens when you run docker compose down with additional parameters such as
--volumes or --rmi all?

When you run docker compose down, Docker Compose stops and removes all the containers
defined in your compose.yaml file, as well as the default network it created.
With additional options, the behavior becomes more destructive by removing additional
artifacts:
--volumes removes any named volumes declared in the configuration file (such as databases
or persistent storage volumes). Without this option, volumes are preserved.
--rmi all removes all images used by the services defined in the configuration file, including
those pulled from Docker Hub or built locally. (Use it carefully if you want to clean up
completely.)
--remove-orphans removes containers not defined in the current configuration file but still
part of the same project/network (often left over from previous runs).
3. You have a compose.yaml file that defines a simple web service using the nginx:alpine
image. Your goal is to run three replicas of the web service using Docker Compose. Create a
basic compose.yaml with the web service and use a Docker Compose command to scale the
service to three instances.
image: nginx:alpine

Scale the service using the CLI:
$ docker compose up --scale web=3 -d

The --scale option tells Docker Compose to run three identical containers for the web service.
Each container is created from the same image and configuration defined in the Compose file.
The -d option runs them in detached mode. Note: If multiple replicas of the same service
attempt to expose the same host port (for example, 8080:80), a port conflict occurs, preventing
additional containers from starting.

### 702.3 Container Image Building
DevOps Tools Engineer v2.0, Exam 701, Objective 702.3
- Create Dockerfiles and build images from Dockerfiles
- Understand OCI image names
- Upload images to a Docker registry
- Understand the principles of image scanners
- Understand security risks of container virtualization and container images and how to
mitigate them
- Awareness Docker buildx, Docker Buildkit, Podman build and Buildah
- docker image *
- docker login
- Dockerfile
- Containerfile
- .dockerignore
- FROM
- COPY
- ADD

- RUN
- VOLUME
- EXPOSE
- USER
- WORKDIR
- ENV
- ARG
- CMD
- ENTRYPOINT

### 702.3 Container Image Building

With Dockerfiles, developers can define custom environments, install dependencies, copy
application code, and configure runtime behavior in a clear, repeatable, and automated way.
Dockerfiles not only streamline the process of building consistent environments across
development, testing, and production, but also promote version control and transparency.
Whether you are deploying a simple web app or a complex microservice, mastering Dockerfiles is
an essential step in automating your infrastructure and ensuring reproducibility across different
systems.
In this lesson, you will learn how to write Dockerfiles from scratch, understand key instructions
like FROM, RUN, COPY, and CMD, and apply best practices to keep your images clean, secure, and
efficient.
Although the files described in this chapter bear the name Dockerfile traditionally used by
Docker, other container engines such as Podman and Buildah prefer the more generic and open
term Containerfile. Both formats are identical — only the filename differs.

Structure of a Dockerfile
Each instruction in a Dockerfile follows a specific format: an instruction keyword followed by its
arguments. Lines that begin with a # character are treated as comments and ignored during the
build process. While instruction keywords are not case-sensitive, it is common practice to write
them in uppercase to easily distinguish them from the arguments that follow.
Docker processes the instructions in the Dockerfile in the exact order they appear, which means
that the sequence is important. The Dockerfile must start with a FROM instruction, which specifies
the base image on which your image will be built. This is the foundation for the rest of the
instructions. Although comments, parser directives, and globally scoped ARG instructions can
appear before the FROM line, no other Docker instructions are allowed to precede it.
In some cases, you might want to use build-time arguments to define the base image dynamically.
Declare those arguments using ARG before the FROM instruction. This allows Docker to resolve
those variables correctly when parsing the Dockerfile and selecting the base image.
The escape character \ in a Dockerfile serves two purposes. When located in the middle of a line,
it escapes the next character, just as it does in the Bash shell and other common tools. However,
this escape behavior does not apply inside a RUN instruction.
Second, when placed at the end of a line, a \ character continues the instruction to the next line of
the file, which can make the file easier to read. This is especially useful when writing long
commands.

FROM Instruction
The FROM instruction is always the first line in a Dockerfile, except for comments and global ARG
lines. FROM tells Docker which base image to use as the starting point when building its custom
image. Every Docker image is built on top of a base image, whether it is a minimal Linux
distribution like Alpine, a full operating system like Ubuntu, or a preconfigured runtime like
Node.js or Python.
The FROM instruction is essential: it defines the foundation of everything that follows in the
Dockerfile. Choosing the right base image can improve performance, reduce image size, and
simplify
maintenance.
You
can
use
official
images
from
Docker
Hub
https://hub.docker.com/ or even custom images stored in a private registry.
A basic example starts the build using Ubuntu 22.04 as the base image:

The following example uses a prebuilt language runtime: the official Python image at version 3.11.
At the time of writing, this is the standard image for Python-based projects:

The following example uses multiple FROM instructions to create a multistage build:
FROM golang:1.20 AS builder
RUN go build -o myapp
FROM alpine:latest
COPY --from=builder /app/myapp /usr/local/bin/myapp
CMD ["myapp"]

This build takes place in two stages. The application is compiled in the first stage using the Go
image. The compiled binary is copied into a lightweight Alpine image for the final build, omitting
the libraries and utilities required during the compilation stage.

ARG Instruction
The ARG instruction defines a build-time variable that can be passed to the Docker build process
using the --build-arg option. These variables are available only during the image build and do
not persist in the final image like ENV variables do.
ARG is useful for customizing an image’s build without hardcoding values directly into the
Dockerfile. Because ARG variables are not encrypted and can be viewed in the image’s history
using docker history, they should not be used to pass secrets or sensitive data.
ARG BASE_IMAGE=alpine:latest
FROM ${BASE_IMAGE}

In this example, the base image is determined by a build-time argument, which makes the
Dockerfile more flexible. You can specify the base image when running the build using the
argument BASE_IMAGE:
$ docker build --build-arg BASE_IMAGE=debian:bullseye -t myimage .

The command-line option overrides the ARG in the Dockerfile, and the build uses
debian:bullseye instead. So the command-line argument always takes precedence over the
Dockerfile default.

COPY and ADD Instructions
The COPY and ADD instructions transfer files and directories from your local machine into the
Docker image during the build process. Both instructions are commonly used to include source
code, configuration files, scripts, and other assets inside a container.
COPY Instruction (Preferred)
The COPY instruction is simpler and more predictable. It copies files and folders from the host into
the image without doing anything extra: no unpacking or downloading:
COPY ./app /usr/src/app

This copies the local ./app directory into the image at /usr/src/app.
To copy individual files:
COPY requirements.txt /app/requirements.txt

To set ownership and permissions (when using Docker v1.31+):
COPY --chown=appuser:appgroup ./app /app

ADD Instruction
The ADD instruction does everything COPY does, plus two extra features:
- It can extract compressed files (e.g., .tar, .gz) automatically into the container.
- It can download files from a URL.
ADD source-code.tar.gz /usr/src/app/

This will automatically unpack the archive into /usr/src/app/.
An example of downloading from a URL follows:

ADD https://example.com/config.json /etc/config.json

This downloads the file from https://example.com/ directly into the image at build time.
Both COPY and ADD help you bring external files into your image, but COPY is the safer, cleaner
choice for most use cases. ADD should be used only when you specifically need its advanced
features.

RUN Instruction
The RUN instruction executes commands inside the image at build time. It is commonly used to
install software packages, configure the environment, or perform setup tasks that are needed
before the container runs. You can use shell syntax, like:
RUN apt install -y curl

The shell form provides the command as a single string, similar to a shell command typed in a
terminal. This form runs the command through /bin/sh -c, allowing for shell features like
environment variable expansion or command chaining.
Another format, called exec form uses a JSON array syntax. The following instruction is equivalent
to the previous example:
RUN ["apt", "install", "-y", "curl"]

The exec form is the recommended format because it does not invoke a shell, resulting in more
predictable and secure behavior.
Each RUN command creates a new layer in the image, and the results of those commands become
part of the final image filesystem.
To optimize builds, it is good practice to combine related commands into a single RUN instruction
using logical operators such as &&. This reduces the total number of layers and keeps the image
smaller and more efficient.
For example, instead of using multiple RUN commands to update the package manager and install
a package, combine them into one:
RUN apt update && apt install -y curl

The instructions in RUN do not execute when the container starts — for runtime behavior, the CMD
or ENTRYPOINT instructions should be used instead.
Efficient use of the RUN instruction ensures that images remain clean, compact, and fast to build,
improving both security and performance in containerized environments.

Cache Invalidation for RUN Instructions
By default, Docker caches the results of each RUN instruction to speed up future builds. This cache
is not automatically invalidated when the base image or remote resources change. For example, if
you have a RUN apt-get dist-upgrade -y instruction, Docker may reuse the package cached
by a previous run when running the next build, even if newer package versions are available.
To ensure that Docker executes all RUN instructions freshly — without using cached layers — you
can use the --no-cache option when building the image:
$ docker build --no-cache .

This forces Docker to skip all cache layers and run every step from scratch, which is useful when
working with frequently updated dependencies or when debugging builds.

VOLUME Instruction
The VOLUME instruction is used to declare a mount point within the container that is linked to a
volume managed by Docker. This means that any data written to that location inside the container
will be persisted outside the container’s writable layer, surviving container restarts, rebuilds, or
even deletions. Volumes are especially useful for storing data that should not be lost, such as
database files, user uploads, or configuration data.
When you define a volume using VOLUME, Docker automatically creates an anonymous volume
unless you specify a named one later through docker run or docker compose. For example, the
instruction VOLUME /data tells Docker that the /data directory inside the container should be
treated as a persistent storage location. Any content written there won’t be lost when the
container is removed.
It is important to note that VOLUME is a build-time declaration, and it does not copy existing files
from the container image into the volume when the container is started. If the directory already
contains files in the image, they may be hidden by the new, empty volume unless handled
carefully during the build process.
The value of the VOLUME instruction can be written in two ways: as a JSON array like VOLUME

["/var/log/"], or as a space-separated list of paths, such as VOLUME /var/log or VOLUME
/var/log /var/db. Both formats define one or more directories inside the container that should
be treated as Docker-managed volumes.
Using VOLUME is a best practice for separating an application’s logic from its data, ensuring better
flexibility, portability, and data safety in containerized environments.
The following example declares a volume in a Dockerfile:
VOLUME /mydata

This Dockerfile declares /mydata as a volume. Anything written to that directory will be stored in
a Docker-managed volume, making it persistent across container runs.

WORKDIR Instruction
The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD
instructions that follow it in the Dockerfile. It behaves similarly to the cd command in a shell,
changing the current directory context within the image during the build process.
If the directory specified does not exist, Docker will automatically create it, so there is no need to
use mkdir beforehand. This makes WORKDIR a cleaner and more reliable way to manage directory
navigation inside your image than manually chaining cd commands in a RUN instruction.
Using WORKDIR also improves readability and maintainability. Instead of repeating full paths
throughout the Dockerfile, you can set the working directory once and refer to relative paths
afterwards.
WORKDIR /usr/src/app
CMD ["node", "app.js"]

In this example, all subsequent commands like COPY, RUN, and CMD operate inside /usr/src/app,
making the Dockerfile clean and concise.
The following example chains together multiple WORKDIR levels:
WORKDIR /var

WORKDIR log

This is equivalent to:
WORKDIR /var/log

Docker resolves relative paths by appending them to the previous WORKDIR.

USER Instruction
The USER instruction sets the user, and optionally the group, under which the following
instructions run inside the container. By default, Docker containers execute commands as the root
user, which has full administrative privileges. However, running containers as root can pose a
security risk, especially in production environments.
The USER switch to a non-root user for improved security. This is particularly useful after
installing packages or setting up an application during the build phase, where administrative
access is needed initially, but not during runtime.
You can specify the user by username (e.g, USER node) or by UID/UID:GID (e.g., USER 1001:1001).
If the specified user doesn’t exist in the base image, it may need to create it using a RUN instruction
and tools such as useradd.
The following example creates a custom user myuser and instructs the Dockerfile to run all
subsequent instructions under that user:
RUN useradd -ms /bin/bash myuser
USER myuser

EXPOSE Instruction
The EXPOSE instruction makes the container listen on specific network ports at runtime. It acts as
a kind of documentation within the image, letting others outside the container know which ports
are intended to be published or connected to. However, it is important to understand that EXPOSE
does not actually publish the port — it only defines which port the application inside the container
will use.
To make a port accessible from outside the container, you still need to use the -p or --publish
option when running the container (e.g., docker run -p 8080:80) or define port mappings in a

compose.yaml file.
The following basic example declares a port that will be exposed:
EXPOSE 3000

In this example, the image declares that the application listens on port 3000. This helps developers
or orchestrators understand how to interact with the container.
The following example exposes multiple ports:
EXPOSE 80 443

This tells Docker that the container listens on both HTTP (80) and HTTPS (443) ports.
While EXPOSE is optional and doesn’t affect container behavior on its own, it helps make your
image more readable, self-documenting, and compatible with container orchestration tools that
can auto-detect exposed ports.

ENV Instruction
The ENV instruction defines environment variables that will be available in the Docker image,
both during the build and at run time. These variables can influence the behavior of software
inside the container, provide configuration settings, or store default values that can later be
overridden when running the container.
Once an environment variable is defined using ENV, it becomes available to all subsequent
instructions in the Dockerfile, such as RUN, CMD, and ENTRYPOINT. It can also be used inside scripts
or application code running in the container:
ENV APP_PORT=3000

This sets the variable APP_PORT to the value 3000. The variable can be used in later steps, for
example:

EXPOSE $APP_PORT

The following example defines multiple variables in a single instruction:
ENV NODE_ENV=production VERSION=1.0.0

The following example refers to an environment variable inside a RUN command:
ENV USER_NAME=developer
RUN echo "Hello, $USER_NAME"

The value of USER_NAME is expanded during the build process and used in the RUN instruction.
Even though ENV sets default values in the image, you can override them when starting a
container through the -e option:
$ docker run -e APP_PORT=8080 myimage

CMD Instruction
The CMD instruction defines the default command that should be executed when a container is
started from the built image. It is the command that runs unless you override it when running the
container with docker run.
There can only be one CMD instruction in a Dockerfile. If you define multiple instructions, only the
last one will be used. The instruction is often used to run an application, a script, or a server when
the container starts:
CMD ["node", "app.js"]

When the container is run, this image will execute node app.js by default.
The default command defined in a Dockerfile can be overridden at runtime. When starting a
container with the docker run command, simply append a new command at the end of the line.

This replaces the instruction specified by CMD in the image:
$ docker run myapp node another-script.js

ENTRYPOINT Instruction
The ENTRYPOINT instruction defines the main command that always runs when the container
starts. Unlike CMD, the command specified in ENTRYPOINT cannot be easily overridden, making it
ideal for containers where the command should never change (like running a specific binary or
entry script):
FROM ubuntu
ENTRYPOINT ["echo"]

When you run the container:
$ docker run myimage Hello World

it will output:
Hello World

Here, ENTRYPOINT is fixed as echo, and whatever you pass as arguments is appended to it.
The exec form is the preferred way to write the ENTRYPOINT instruction, because it avoids using a
shell and provides more predictable behavior. The form looks like this:
ENTRYPOINT ["executable", "param1", "param2"]

Alternatively, you can use the shell form, which runs the command through the shell (/bin/sh
-c on Linux):
ENTRYPOINT command param1 param2

Like CMD, only the last ENTRYPOINT defined in a Dockfile will be used.

Combining ENTRYPOINT and CMD
You can combine both of these commands to create a flexible default behavior. In this setup,
ENTRYPOINT defines the main command, and CMD provides default arguments:
FROM ubuntu
ENTRYPOINT ["echo"]
CMD ["Hello from Docker!"]

This allows the container to run with the default message, or override it:
$ docker run myimage

prints Hello from Docker!.
$ docker run myimage Goodbye

prints Goodbye.

The .dockerignore File
The .dockerignore file tells Docker which files and directories to exclude from the build context
when building an image. This is similar to how .gitignore works with Git. By excluding
unnecessary files — such as source control metadata, temporary files, local build artifacts, or large
files not needed inside the image — you can make your Docker builds faster, cleaner, and more
secure.
When you run docker build, Docker sends the entire build context (everything in your current
directory, by default) to the Docker daemon. If you don’t use .dockerignore, that context might
include files you don’t need, slowing down the build and potentially leaking sensitive data into the
image.
An example of a basic .dockerignore file follows:
.git
node_modules
*.log
.env
Dockerfile~

This example tells Docker to ignore:
- The entire .git folder (version control metadata).
- The node_modules directory (which can be rebuilt inside the container).
- All .log files (such as debug.log).
- The .env file (commonly used for secrets or configs).
- Any backup copy of the Dockerfile (the Dockerfile~ produced by Emacs).
Never include sensitive files such as .env, SSH keys, or config files with credentials in your image.
The .dockerignore file is a great way to make sure they are never even sent to the Docker
daemon.

## 1. Create a Dockerfile that uses ubuntu:22.04 as the base image and prints Hello from
Ubuntu! when the container runs.

2. Copy index.html into /usr/share/nginx/html/ using the nginx:alpine image.

3. Expose port 8080.

4. Set the working directory to /app, copy files, and run npm install.

## 5. If a Dockerfile refers to the container’s base image without a specific version tag, which tag of
that image is used to create the container?

## 1. You have the following Dockerfile:
COPY package.json .

Now, imagine you change a line of JavaScript in a .js source file (not in package.json). When
you rebuild the image, will npm install run again? Why or why not?

To create Docker images, developers write Dockerfiles, which are text files containing step-by-step
instructions that define how the image should be built. These instructions include FROM to set the
base image, COPY and ADD to bring files into the image, and RUN to execute commands for
purposes such as installing packages. The .dockerignore file helps optimize builds by excluding
unnecessary files from the build context, improving performance and security.
Other essential instructions include VOLUME to declare persistent storage, EXPOSE to document
which ports the container listens on, and USER to switch from the root user to a non-privileged
user for security. You can also set the working directory with WORKDIR, define environment
variables with ENV, and use ARG to define build-time variables. Finally, CMD and ENTRYPOINT
control what runs when the container starts: ENTRYPOINT defines the main command, while CMD
is this case provide default arguments to the main command.

## 1. Create a Dockerfile that uses ubuntu:22.04 as the base image and prints Hello from
Ubuntu! when the container runs.
CMD ["echo", "Hello from Ubuntu!"]

## 2. Copy index.html into /usr/share/nginx/html/ using the nginx:alpine image.
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/

## 3. Expose port 8080.
EXPOSE 8080

4. Set the working directory to /app, copy files, and run npm install.

## 5. If a Dockerfile refers to the container’s base image without a specific version tag, which tag of
that image is used to create the container?
If a Dockerfile refers to a base image without specifying a version tag, Docker uses the image
tagged as latest by default. For instance, given the following instruction:
FROM node

Docker pulls node:latest, which points to the most recent stable release of the Node.js image
at the time of building.
“Latest” does not mean “always up-to-date” — it simply refers to the image tagged as latest by
the maintainer, which can change over time. For reproducible builds, it is recommended to
specify explicit version tags like node:18 or node:18.17.1.

## 1. You have the following Dockerfile:
COPY package.json .

Now, imagine you change a line of JavaScript in a .js source file (not in package.json). When
you rebuild the image, will npm install run again? Why or why not?
No, npm install will not run again, because the COPY package.json . and RUN npm
install layers are cached. Since package.json hasn’t changed, Docker reuses the cache up to
that point. Only the COPY . . instruction and following layers will be rebuilt. This is why it is a
best practice to copy package.json and run npm install before copying the rest of the
source code — it helps use the build cache effectively.

### 702.3 Container Image Building

This lesson goes deeper into how container images are named, built, uploaded, and secured in
modern DevOps workflows. We will begin by exploring the Open Container Initiative (OCI) image
naming conventions, which define how images are identified and pulled from registries. You will
then learn how to upload images to a Docker registry, making them accessible for deployment and
collaboration across environments.
Security is a crucial part of any container strategy. You will discover how image scanners help
detect vulnerabilities and gain insight into the risks of container virtualization and container
images, along with practical strategies to mitigate those risks.
Finally, the lesson introduces the advanced build tools Docker Buildx, Docker BuildKit, Podman
build, and Buildah. These offer greater flexibility, performance, and security during image builds.

Building Images With docker build
The docker build command creates a Docker image from a Dockerfile and a build context. It is
one of the most essential commands in container development, because it turns your application

code and dependencies into a reusable, portable image.
When you run docker build, Docker reads the instructions from a file named Dockerfile,
processes each step in order, and assembles an image. The build context is the set of files in your
current directory (or a specified path), which Docker sends to the Docker daemon to use during
the build.
The basic syntax is:
$ docker build [OPTIONS] PATH

The PATH points to a directory containing your Dockerfile and build context (usually . (dot) for the
current directory). The -t option tags the image with a name and optional version, e.g., -t
myapp:1.0. The --file or -f option allows you to specify a custom Dockerfile name or location,
for example:
$ docker build -t myapp:1.0 -f Dockerfile.dev .

This builds an image using the Dockerfile Dockerfile.dev in the current directory and tags the
image as myapp:1.0.
Each instruction in the Dockerfile (like FROM, COPY, RUN, CMD) creates a layer in the image. Docker
caches these layers to speed up future builds. If the content or instruction hasn’t changed, Docker
reuses the cached layer, which makes builds more efficient.

OCI Image Names
An OCI image name is the standardized way to refer to container images according to Open
Container Initiative (OCI) specifications. This naming format allows container tools such as Docker,
Podman, and Buildah to pull, tag, push, and identify images consistently across different
platforms and registries.
Understanding OCI image naming is essential for managing container images in CI/CD pipelines,
in Kubernetes deployments, and across various cloud-native environments. It ensures portability,
version control, and traceability of images across systems and registries.
An OCI-compliant image name has the following structure. Any element within [] brackets in the
format is optional, so the image is the only required element:

[registryhost[:port]/][namespace/]image[:tag][@digest]

Let’s break the format down:
registryhost
The domain name of the registry (e.g., docker.io, quay.io, registry.example.com). If
omitted, the registry in Docker defaults to Docker Hub (docker.io).
port
Specifies the network port used to connect to a custom container registry.
namespace
Often represents a user or organization. On Docker Hub, the default is library for official
images.
image
The name of the image itself, such as nginx, ubuntu, or myapp.
tag
Identifies a specific version of the image (e.g., :latest, :1.0.3). The tag defaults to :latest if
not specified.
digest
A unique SHA256 hash that represents a specific, immutable version of the image (e.g.,
@sha256:…).
A registry is a remote server where Docker images are stored and from which the images can be
shared, downloaded, and deployed. Popular registries include Docker Hub, GitHub Container
Registry, GitLab Container Registry, and private registries like Harbor or AWS ECR.
Examples of image names follow:
Interpreted as docker.io/library/nginx:latest after defaults are filled in.
docker.io/<username>/myapp:1.2
Pulls version 1.2 of myapp from Docker Hub under user <username>.
registry.example.com/app/backend@sha256:abc123…
Pulls a specific digest from a private registry.

Uploading Images to a Docker Registry
After you have built a Docker image using docker build, the next step is often to upload (push)
that image to a Docker registry. Uploading images to a Docker registry allows you to share, deploy,
and reuse your containers across environments and teams.
To upload an image, you first need to tag it with the registry name, username or namespace, and
repository name using the docker tag command:
$ docker tag myapp:1.0 docker.io/<username>/myapp:1.0

This creates a new tag for an existing Docker image named myapp:1.0. In this case, you are
tagging the local image so that it is ready to be pushed to Docker Hub under the account or
namespace <username>.
Let us break the format of the tag down:
myapp:1.0
The name and tag of the local image that was built using docker build.
docker.io/<username>/myapp:1.0
The fully qualified name for the image on Docker Hub. The name consists of:
docker.io
The hostname of Docker Hub (can be omitted as it is the default).
<username>
The Docker Hub username or namespace.
myapp
The repository under that account.
1.0
The tag, representing a version or variant of the image.
Before uploading an image to a registry, authentication is required for registries that enforce
access control, such as Docker Hub.
Use the docker login command to authenticate with the registry:

$ docker login

The command prompts for a username and a password or access token, depending on the
registry’s authentication method.
Once the image has been properly tagged and authentication completed, it can be uploaded to
Docker Hub using the docker push command:
$ docker push docker.io/<username>/myapp:1.0

This publishes the image to the specified repository, making it available for pulling and
deployment on other systems or environments.
After the push completes, the image will be available online and can be pulled down to any other
machine with Docker installed.
A full example follows for uploading an image to Docker Hub:
$ docker build -t myapp:1.0 .
$ docker tag myapp:1.0 yourdockerhubusername/myapp:1.0
$ docker login
$ docker push yourdockerhubusername/myapp:1.0

In a Podman environment, you can use podman build to build container images from a
Dockerfile, just as you would with docker build. It is part of the Podman toolset: an open-source,
daemonless container engine that is compatible with Docker but designed with enhanced security
and flexibility, especially for rootless environments.
Unlike Docker, which relies on a background daemon (dockerd), Podman executes each container
as an independent user process, making it particularly suited for multi-user systems and
environments with strict privilege separation, for example:
$ podman build -t myapp:1.0 -f Dockerfile .

The resulting image can then be managed, tagged, and pushed using the same syntax and

workflow as Docker, ensuring a seamless experience across both ecosystems.
Just like Docker, podman build processes the instructions in the Dockerfile line by line to create
an image layer by layer. The syntax, options, and behavior are nearly identical to Docker, making
it easy for users to transition between the two. The basic syntax is:
$ podman build [OPTIONS] PATH

Image Scanners
Image scanners are tools designed to analyze container images for security vulnerabilities,
outdated packages, misconfigurations, and even embedded secrets. These scanners play a vital
role in securing your containerized applications by identifying risks before images are deployed
into production environments.
A Docker image can include operating system packages, libraries, and dependencies. Over time,
these components might develop known security flaws, usually tracked as Common Vulnerabilities
and Exposures (CVEs). Image scanners compare the contents of an image against public lists of
vulnerabilities such as the U.S. National Vulnerability Database (NVD), and report any known
issues.

The Scanning Process
Image scanners work by unpacking the image layers to inspect the files, libraries, and packages
contained within the image. After extracting the contents, the scanner identifies the installed
software and their versions, then compares this information against known vulnerability
databases to detect any security issues. The scanner then reports the findings, usually assigning
severity levels such as low, medium, high, or critical. Some advanced scanners may also provide
suggestions for remediation or recommended updates, helping developers address the
vulnerabilities before deploying the image to production.
Scanners can be run locally, integrated into CI/CD pipelines, or provided by container registries
(like Docker Hub, GitHub Container Registry, or Harbor).

Why Use Container Image Scanners?
One of the primary functions of container image scanners is vulnerability detection. Since
container images typically bundle third-party libraries, dependencies, and operating system
components, they may contain known vulnerabilities. Scanners analyze each layer of the image to
detect outdated or risky packages, allowing developers to address these issues early in the

development lifecycle.
Scanners also support compliance and best practices. In many industries, organizations must
meet strict regulatory standards such as GDPR, HIPAA, or PCI-DSS, which require regular security
audits and documentation. Image scanners help ensure that containers comply with these policies
and follow security best practices automatically, improving audit readiness and reducing manual
effort.
The benefits of scanning are a form of supply chain security. Today’s applications depend on a
complex web of dependencies, including base images and third-party code. Image scanners help
verify the origin and integrity of each component, mitigating the risk of supply chain attacks
where malicious actors inject vulnerabilities into trusted code.
Image scanners contribute to a reduced attack surface. By continuously inspecting and improving
container images, organizations can eliminate unnecessary risks, making it more difficult for
attackers to exploit weaknesses. This proactive approach to container security enhances overall
resilience and confidence in the deployment pipeline.

Security Risks and How to Mitigate Them
While containers are lightweight and efficient, they introduce unique security risks that differ
from a traditional virtual machine (VM). One key concern is that containers share the host kernel,
which means that a vulnerability in the container runtime or a misconfigured container could
potentially affect the host system. Unlike VMs, containers rely more heavily on namespaces and
cgroups for isolation, which — if poorly configured — can lead to privilege escalation or container
breakout.
Another major risk lies in the container images themselves. Images could contain outdated
packages, known vulnerabilities (CVEs), embedded secrets, or malware — especially when built
from untrusted or unofficial sources. If developers pull images directly from public registries
without verification, they might unknowingly introduce insecure components into production.

Shared Kernel Vulnerabilities
Containers share the host operating system’s kernel, unlike virtual machines (VMs), which have
isolated kernels. A vulnerability introduced into the kernel could allow an attacker to exploit one
container to compromise others or even the host system.
To reduce security risks in containerized environments, it is essential to use a minimal and
hardened host operating system, such as CoreOS or RancherOS, which are designed specifically
for running containers securely.

Keeping the host kernel up to date and regularly applying security patches is also critical, because
many container vulnerabilities stem from kernel-level exploits. Additionally, containers should be
run with reduced privileges whenever possible.

Privileged Containers
Running containers with elevated privileges (e.g., using the --privileged option) grants them
unrestricted access to the host system, making them a prime target for attackers.
To enhance container security, it is important to avoid running containers in privileged mode
unless absolutely necessary. Instead of granting full privileges, use fine-grained Linux capabilities
to provide only the specific permissions required by the application.
For example, if a container needs to modify network settings, you can run it with only the
NET_ADMIN capability by using a command like:
$ docker run --cap-add=NET_ADMIN my-container

This approach limits the container’s power while still allowing it to perform its intended function,
aligning with the principle of least privilege.

Running Containers as Root
Running containers as non-root users is a fundamental security best practice that significantly
reduces the potential impact of a container compromise. By specifying a non-privileged user in
the Dockerfile using the USER instruction, you limit what an attacker can do if they gain access to
the container. Containers running as root can interact with the host system more freely,
increasing the risk of privilege escalation or unauthorized access.

Runtime Hardening
It is crucial to apply runtime security controls such as Seccomp, AppArmor, or SELinux. These
kernel security modes provide fine-grained restrictions on system calls, file access, and process
behavior, helping to enforce the principle of least privilege. These tools create a strong security
boundary around your containers, protecting both the application and the host environment from
malicious actions.

Resource Isolation Issues
Containers share resources including CPU, memory, and disk space. Misconfigured resource limits
can lead to resource exhaustion attacks (e.g., one container consuming all available memory).

To prevent containers from consuming excessive system resources and potentially affecting other
workloads, it is important to set resource limits. In Docker, this can be done using options such as
-m to limit memory and --cpus to restrict CPU usage.

Network Exposure
By default, containers can expose unnecessary ports or use insecure networking configurations,
leaving them vulnerable to network-based attacks.
To minimize exposure and reduce the risk of network-based attacks, it is recommended to use
internal networks and avoid exposing containers directly to the internet unless absolutely
necessary. Services that require external access should be placed behind load balancers, proxies,
or API gateways.

Vulnerable Base Images
Base images often include outdated packages or libraries with known vulnerabilities. Attackers
can exploit these vulnerabilities to gain unauthorized access.
To reduce the risk of vulnerabilities in container images, it is important to use minimal and
trusted base images such as alpine, or to create distroless images. These images have a smaller
attack surface because they include only the essential components needed to run an application.

Hardcoded Secrets
Developers sometimes embed sensitive information such as API keys, passwords, or certificates
directly into container images. If these images are compromised, the secrets are exposed. Always
avoid including secrets in Dockerfiles or image layers.

Unnecessary Packages
Including unnecessary packages in container images increases the attack surface and introduces
potential vulnerabilities. Use multi-stage builds to create lean images that include only essential
components.

Malicious or Tampered Images
Downloading images from untrusted registries can introduce malicious code or tampered images
into your environment. Pull images only from trusted sources (e.g., official Docker Hub
repositories or private registries). Use image signing and verification tools like Docker Content
Trust (DCT) to ensure image integrity.

Insecure Default Configurations
Default configurations in orchestration platforms may not be secure out-of-the-box. Follow
security best practices for your orchestration platform (e.g., Kubernetes CIS benchmarks).

Docker Buildx, Docker BuildKit, and Buildah
Modern container development goes far beyond the traditional docker build command.
Developers now have access to advanced, flexible tools that include Docker Buildx, Docker
BuildKit, Podman build, and Buildah, each designed to meet the evolving demands of secure,
scalable, and high-performance image creation. These tools empower teams to carry out more
efficient builds, automate complex workflows, and support diverse environments and platforms.
Docker BuildKit is a powerful backend builder that enhances Docker’s native build capabilities. It
brings significant improvements such as faster and more efficient builds, parallel execution of
independent layers, support for build-time secrets (e.g., SSH keys or API tokens), and advanced
caching mechanisms that reduce redundancy across builds. These features are particularly
valuable in large-scale CI/CD pipelines. BuildKit is now the default builder in modern Docker
versions. It works seamlessly with Dockerfiles while improving security, performance, and
developer productivity.
Docker Buildx is a command-line extension that sits on top of BuildKit and enables cross-platform
builds. Buildx can build images for multiple architectures — such as linux/amd64, linux/arm64,
or linux/ppc64le — on a single host using emulators such as QEMU. Buildx also supports multinode build clusters, remote cache exports, and advanced driver configurations, making it ideal for
cloud-native workflows and distributed build environments. It is a must-have for teams targeting
multiple deployment platforms (e.g., cloud, edge, and IoT).
Buildah is a lower-level, scriptable image builder developed by the same team behind Podman.
Unlike Docker or Podman, Buildah allows you to build images from scratch or from existing layers
without even using a Dockerfile. It provides complete control over each step of the build process
via a command-line interface or shell scripts. This design makes it highly suitable for automation
in CI/CD pipelines, minimal container builds, and systems that prioritize fine-grained security
controls and rootless execution.
These tools represent the next generation of container image builders, designed to be faster, more
secure, and more flexible than ever before. Whether you are building on-premises, in the cloud,
or across multiple architectures, understanding and employing these tools gives you a powerful
advantage in the container ecosystem.

## 1. Create a Dockerfile that uses the node:18 image, copies the current directory into /app, installs
dependencies with npm install, and runs npm start. Then build and tag the image as
myapp:1.0.

2. Tag the myapp:1.0 image to match your Docker Hub namespace and push it to the registry.

3. Create a simple Dockerfile using the alpine image and build it using podman.

## 4. Modify the following Dockerfile to create a non-root user and run the container as that user
instead of the default root user.
CMD ["python", "app.py"]

5. Run a container with limited CPU and memory to prevent resource exhaustion attacks.

1. A developer accidentally commits a .env file containing database credentials into the source
code repository. Later, the file is included in a Docker image via COPY . . and the image is
pushed to a public registry. What are the security implications of this mistake, and what steps
should be taken to prevent and remediate it?

2. A developer builds an image using the node:18 base image for a simple static site and includes
many tools for local development (e.g., curl, vim, git). The image is pushed to production.
Why is this a potential security risk, and how could the image be optimized for production use?

This lesson explored how to create, tag, and manage container images using tools like docker
build, podman build, and advanced builders such as Docker Buildx, BuildKit, and Buildah. You
learned how the docker build command transforms application code and dependencies into
reusable images, and how OCI-compliant image names ensure portability and consistency across
different registries and platforms. You also saw how to upload images to remote registries like
Docker Hub, using commands such as docker tag, docker login, and docker push, enabling
collaboration and deployment across teams and environments.
Beyond building and distributing images, the lesson focused on critical security practices,
including the use of image scanners to detect vulnerabilities, and strategies to mitigate common
container risks, such as avoiding privileged containers, running as non-root users, limiting
resource usage, and isolating containers from the network.
The lesson concluded with an overview of modern image-building tools such as Docker Buildx and
Buildah, which offer improved performance, multiplatform support, and better integration into
secure, automated CI/CD workflows. Altogether, this foundation empowers you to build, secure,
and manage container images with confidence and efficiency.

## 1. Create a Dockerfile that uses the node:18 image, copies the current directory into /app, installs
dependencies with npm install, and runs npm start. Then build and tag the image as
myapp:1.0.
The Dockerfile is:

The build command is:
$ docker build -t myapp:1.0 .

## 2. Tag the myapp:1.0 image to match your Docker Hub namespace and push it to the registr:
Tag the image:
$ docker tag myapp:1.0 <yourdockerhubusername>/myapp:1.0

Log in to Docker Hub:
$ docker login

Push the image:
$ docker push <yourdockerhubusername>/myapp:1.0

Now your image is available in your Docker Hub repository.
3. Create a simple Dockerfile using the alpine image and build it using podman.
The Dockerfile is:

FROM alpine
CMD ["echo", "Hello from Podman"]

The build command is:
$ podman build -t hello-podman .

Run the container:
$ podman run hello-podman

The expected output is:
Hello from Podman

This confirms that Podman built and executed the container successfully.
4. Modify the following Dockerfile to create a non-root user and run the container as that user
instead of the default root user.
Original Dockerfile:
CMD ["python", "app.py"]

The following rewritten Dockerfile reduces the risk of privilege escalation in case the container
is compromised:
RUN useradd -m appuser
USER appuser

CMD ["python", "app.py"]

5. Run a container with limited CPU and memory to prevent resource exhaustion attacks.
The following command limits the container to 512MB of memory and 1 CPU, preventing it
from consuming all host resources:
$ docker run -m 512m --cpus="1" nginx

1. A developer accidentally commits a .env file containing database credentials into the source
code repository. Later, the file is included in a Docker image via COPY . . and the image is
pushed to a public registry. What are the security implications of this mistake, and what steps
should be taken to prevent and remediate it?
Including sensitive files like .env in a Docker image exposes secrets to anyone who can pull or
inspect the image. Even if the image is later deleted, if it was pushed to a public registry, the
credentials could have already been leaked or cached elsewhere.
Implications include unauthorized access to production databases or APIs, compromises of
customer data or internal systems, and violations of security and compliance policies.
To prevent this, create a .dockerignore file to exclude .env, .git, and other sensitive files
from the build context:
.env
.git
node_modules

After sensitive data exposure, immediate remediation is critical:
- Rotate all exposed credentials — database passwords, API tokens, certificates.
- Delete compromised images and tags from registries, but assume leaks are permanent.
- Audit access logs for suspicious connections or data exfiltration.
- Clean the repository history to remove .env traces.
- Rebuild and redeploy using new secrets, ensuring none are stored in Docker layers.
- Implement secret management (Vault, Docker/Kubernetes secrets, BuildKit secrets).
These actions contain damage, restore security, and prevent recurrence.
2. A developer builds an image using the node:18 base image for a simple static site and includes
many tools for local development (e.g., curl, vim, git). The image is pushed to production.
Why is this a potential security risk, and how could the image be optimized for production use?
Including unnecessary packages such as vim and git in a production image increases the
attack surface. More software means more potential vulnerabilities. Development tools should
not be shipped with production code.

A better approach is to use a multi-stage build where one stage installs dependencies and
builds the application, and a second stage uses a minimal base image (such as alpine or a
distroless image) to include only the final output, for example:
FROM node:18 AS builder
RUN npm install && npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

This way, the final image is smaller, faster to deploy, and more secure.

## Topic 703: Kubernetes

### 703.1 Kubernetes Architecture and Usage
DevOps Tools Engineer v2.0, Exam 701, Objective 703.1
4
- Understand the major components and services in a Kubernetes cluster
- Configure kubectl to use an existing Kubernetes cluster
- Use kubectl to get information about Kubernetes resources
- Use kubectl to create, modify and delete resources
- Awareness of Kubernetes Operators
- API-Server, etcd, Controller Manager, Scheduler
- ~/.kube/config
- kubectl get
- kubectl describe
- kubectl apply
- kubectl create
- kubectl run
- kubectl expose
- kubectl scale

- kubectl set
- kubectl edit
- kubectl explain
- kubectl config
- kubectl logs
- kubectl exec

### 703.1 Kubernetes Architecture and Usage

Kubernetes has become the de facto standard for container orchestration, enabling developers
and operators to deploy, scale, and manage containerized applications efficiently. This lesson
explores the core concepts and essential tools needed to work effectively within a Kubernetes
environment.
Kubernetes, often abbreviated to “K8s,” was originally developed by Google, drawing on their
years of experience running large-scale containerized workloads on an internal system called
Borg. Released as an open source project in 2014, Kubernetes was donated to the Cloud Native
Computing Foundation (CNCF), where it rapidly gained adoption across the tech industry. Today, it
is backed by a vibrant ecosystem of contributors and used by organizations of all sizes to power
modern, cloud-native applications.
At the heart of Kubernetes architecture is a well-defined set of components that work together to
manage the deployment, scaling, and operation of applications across clusters of machines. This
lesson covers the major building blocks of a Kubernetes cluster: the control plane (with
components like the API Server, Scheduler, Controller Manager, and etcd) and the worker nodes
(which run the kubelet, Kube-Proxy, and container runtime). Understanding how these

components interact is key to mastering how Kubernetes maintains the desired state of its
applications and ensures high availability, resilience, and automation at scale.

Kubernetes Architecture
A Kubernetes cluster is composed of a centralized set of components known as the control plane,
along with one or more worker nodes where applications are actually deployed and run
(Kubernetes components).

Figure 5. Kubernetes components

The control plane acts as the brain of the cluster, managing the overall state and orchestration of
workloads. It handles scheduling decisions, monitors the health of components, and ensures that
the desired state of applications is maintained across the environment.
The worker nodes are responsible for running the actual containerized workloads. Each node
contains essential services that enable it to communicate with the control plane, manage
containers, and provide the computing resources necessary to execute applications.
Together, the control plane and worker nodes form a scalable and resilient platform for managing
containerized applications at scale. The following sections describe the make-up and operations of
the control plane, worker nodes, and auxiliary services.

Control Plane
In a standard Kubernetes setup, especially in distributions such as kubeadm, Minikube, or K3s,

each component of the control plane — such as the API Server, Controller Manager, Scheduler,
and etcd — typically runs as an individual container. This design promotes modularity, ease of
deployment, and isolation between services.

API Server
The API server acts as the front end for the Kubernetes control plane. It exposes the Kubernetes
API and serves as the central point of communication between users, automation, and other
components. It is typically deployed as a containerized process named kube-apiserver.
The kube-apiserver is built to support horizontal scaling, meaning that its capacity can be
increased by running multiple instances in parallel. By deploying several instances of kubeapiserver and distributing incoming traffic among them, you can improve the availability and
performance of the control plane.
Users, administrators, and other Kubernetes components (such as the scheduler and controller
manager) communicate with the cluster through this API. Any command you run using kubectl
or an automation tool interacts with the API server.
The API Server has several key responsibilities within a Kubernetes cluster. The server validates
and processes each request before passing it to the appropriate component. As the entry point for
resource operations, it handles the creation, updating, and deletion of Kubernetes objects such as
pods, deployments, and services.
Additionally, the API Server plays a crucial role in enforcing security by applying authentication,
authorization, and admission control policies to ensure that only legitimate and authorized
actions are performed within the cluster.

etcd
etcd is a distributed, consistent key-value store that acts as the single source of truth for the
cluster’s configuration data and state. It stores information about nodes, pods, configurations,
secrets, and more, making it a critical component of the Kubernetes control plane.
etcd ensures that the cluster’s state is consistent and recoverable, even in the event of failures.
Misconfigurations or corruption in etcd can bring down the entire cluster, so understanding its
role and backup strategies is vital.
etcd is known for being highly reliable and fault-tolerant. It uses the Raft consensus algorithm to
maintain consistency across multiple etcd instances within a cluster, ensuring that all nodes agree
on the current state of the data. Additionally, etcd stores versioned data, which allows
administrators to roll back to previous states if necessary — an essential feature for recovering

from misconfigurations or failures.
Because of its critical role, etcd is often isolated and highly protected, and many Kubernetes
distributions and cloud providers offer managed etcd instances with automated backups and high
availability features.
The software that runs on etcd is simply the etcd server itself, a Go-based daemon that runs as a
standalone process in a container. It can operate in single-node mode for basic setups or in multinode clustered mode for high availability.
Internally, etcd stores data in a hierarchical key-value structure that resembles a filesystem (e.g.,
/registry/pods/, /registry/nodes/). The Kubernetes API Server interacts directly with etcd
to persist and retrieve all cluster state, such as pod definitions, node status, or service
configurations.

Controller Manager
The controller manager is responsible for maintaining the cluster’s desired state by running
various controllers: for example, the node controller, replication controller, and endpoints
controller. All of these are bundled into a single kube-controller-manager binary, usually
running inside a container.

Key Controllers
Controllers automate many operational tasks, reducing manual intervention. For example, if a
pod crashes, the replication controller automatically spins up a replacement. Understanding these
controllers helps in troubleshooting and optimizing cluster behavior:
The node controller is responsible for monitoring the status of each node in the cluster. It
continuously checks whether nodes are healthy and responsive by listening for heartbeat
messages sent by the kubelet running on each node. If a node fails to report within a configured
timeout, the Node Controller marks it as NotReady. If the node remains unreachable for an
extended period, the controller may evict all pods scheduled on that node to allow the workload to
be rescheduled elsewhere. This behavior ensures that workloads remain available even in the
face of hardware or network failures.
The replication controller ensures that a specified number of pod replicas is running and healthy
at all times. If a pod fails or is deleted, the controller creates a new one to replace it.
The endpoint controller is responsible for managing the endpoint objects that link Kubernetes
Services to the actual pods backing them. Every time a pod with matching labels is created or
removed, the endpoint controller updates the corresponding endpoints resource to reflect the set

of IP addresses associated with that pod in that service. This allows Kubernetes Services to do
automatic load balancing on traffic across the correct set of pods, ensuring reliable and dynamic
service discovery within the cluster.
Service account and token controllers work together to automate the management of service
accounts and their associated secrets. When a new namespace is created or a pod is scheduled, the
service account controller ensures that a default service account is present. The token controller
generates and attaches long-lived authentication tokens (stored as secrets) to service accounts,
which are then mounted into pods as files. These tokens are used for secure communication
between pods and the Kubernetes API, enabling role-based access control (RBAC) and
authenticated API calls from within containers.
Together, these controllers form a key part of the Kubernetes control loop architecture, constantly
observing the current state of the system and taking actions to ensure it matches the desired state.

Cloud Controller Manager
The cloud controller manager is an optional component of the Kubernetes control plane that
handles interactions between your cluster and your cloud provider’s APIs. It encapsulates all
cloud-specific control logic, effectively separating it from the core Kubernetes components that
operate independently of the underlying infrastructure. This separation ensures a cleaner
architecture and allows Kubernetes to support multiple cloud providers with minimal disruption
to the core system.
This component runs only the controllers that are relevant to the cloud environment where your
cluster is deployed. These typically include controllers for managing cloud load balancers,
networking routes, persistent volumes, and node lifecycles based on the cloud provider’s
metadata. If you are operating Kubernetes in a non-cloud environment — such as on-premises or
within a local development setup — your cluster won’t include a cloud-controller-manager, as it is
not needed.

Scheduler
The scheduler assigns newly created pods to nodes based on resource availability and policy
constraints. Like the other components, it runs as a container process under the name kubescheduler.
The Kubernetes scheduler constantly watches for pods that have been created but are not yet
assigned to a node. When such pods are detected, the scheduler evaluates a wide range of factors
to select the most suitable node for each pod. These factors include resource availability like CPU
and memory, as well as more complex criteria such as node taints and pod tolerations, node and

pod affinity or anti-affinity rules, and even custom scheduling constraints defined by the
administrator.
Once all constraints are considered, the scheduler applies a scoring algorithm to rank eligible
nodes and assigns the pod to the node with the highest score. Its goal is not only to meet the pod’s
requirements but also to ensure a balanced and efficient distribution of workloads across the
cluster. This helps prevent resource bottlenecks, maximizes performance, and supports high
availability.
The scheduler does not actually run the pod; it simply updates the pod specification with the
chosen node. The kubelet on that node then takes over and starts the pod. This separation of
concerns allows Kubernetes to scale efficiently and adapt dynamically to changes in cluster state.

Worker Node Components
Worker nodes are the machines (physical or virtual) where application workloads run. Each
worker node runs several key components that enable it to execute and manage containers.

Kubelet
An agent named kubelet runs on each worker node and ensures that containers are running in
the desired state. It communicates with the control plane and the container runtime.
The kubelet plays a critical role in Kubernetes as the primary agent running on each worker node.
It communicates with the API server to receive instructions about which pods should be running
on that node. Upon receiving these instructions, the kubelet interacts with the container runtime
to create, start, stop, or restart containers as needed. In addition to managing the container
lifecycle, the kubelet continuously monitors the health and status of the running pods and reports
this information back to the control plane, ensuring that the cluster’s views of the node’s state is
up to date.
The kubelet is the bridge between the control plane and the container runtime. If the kubelet
process fails, the node may become unresponsive, leading to potential downtime for applications
running on that node.

Kube-Proxy
Kube-proxy is an optional network proxy that runs on each worker node and implements part of
the Kubernetes service concept. It ensures that network traffic is routed correctly between pods
and services.

The kube-proxy is a key networking component in a Kubernetes cluster, responsible for managing
the rules that govern how network traffic is routed to services. It handles iptables or IPVS rules to
implement efficient load balancing, ensuring that incoming requests are correctly forwarded to
the appropriate pod endpoints. Additionally, kube-proxy supports sophisticated features such as
session affinity, which helps maintain a consistent connection to the same backend pod, and
connection tracking, allowing the node to handle large volumes of network traffic reliably.

Container Runtime
The container runtime is a fundamental component that enables Kubernetes to execute and
manage containers on each node. Its key functions include pulling container images from
registries, launching containers based on those images, and managing their entire lifecycle from
start to stop. It communicates with the kubelet through the container runtime interface (CRI), an
abstraction layer that allows Kubernetes to support different container runtimes such as
containerd, CRI-O, and Docker (via shim). This modular design allows for flexibility in choosing
or switching runtimes while maintaining consistent functionality across the cluster.

Auxiliary Services
In addition to the core components, Kubernetes relies on several auxiliary services to enhance
functionality and scalability.

Networking
Kubernetes requires a flat, consistent network model to allow pods to communicate seamlessly
across nodes. This is typically implemented using networking plugins like Calico, Flannel, or
Cilium.

Storage
Kubernetes provides abstractions like persistent volumes (PVs) and persistent volume claims (PVCs)
to decouple storage from individual pods. Persistent storage ensures that data survives the
termination, restart, and rescheduling of each pod. Properly configuring storage is essential for
stateful applications such as databases.

NOTE

To complete the proposed exercises related to Kubernetes, you are advised to
install Minikube by following the step-by-step instructions available at Minikube
Docs. Minikube is an excellent option for practicing with Kubernetes.

## 1. Explain the purpose of the Kubernetes API Server in the control plane. Why is it considered the
“front door” of the cluster?

2. What kind of data does etcd store, and why is it critical for cluster reliability?

3. What are some factors the scheduler considers when assigning a pod to a node?
