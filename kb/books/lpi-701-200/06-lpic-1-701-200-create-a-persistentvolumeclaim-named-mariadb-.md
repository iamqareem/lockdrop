---
id: lpi-701-200-06
title: "LPIC-1 · 701-200 — Create a PersistentVolumeClaim named mariadb-pvc, requesting 200M…"
slug: lpi-701-200-06-lpic-1-701-200-create-a-persistentvolumeclaim-named-mariadb-
source: "LPI Learning Material — LPIC-1 (Exam 701-200)"
sourceSection: "1. Create a PersistentVolumeClaim named mariadb-pvc, requesting 200M of storage. Use it to, 1. Create a pod with two containers that communicate through a shared volume. One container, 2. What’s the difference between using a volume in Kubernetes with a PersistentVolumeClaim, 1. Create a PersistentV"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "Create a manifest named pvc.yaml for the PersistentVolumeClaim: Covers 28 sections: Create a PersistentVolumeClaim named mariadb-pvc, requesting 200M of storage. Use it to, Create a pod with two container."
---
# LPIC-1 · 701-200 — Create a PersistentVolumeClaim named mariadb-pvc, requesting 200M…

## 1. Create a PersistentVolumeClaim named mariadb-pvc, requesting 200M of storage. Use it to
persist the data of a MariaDB container. The pod should run a MariaDB service with a custom
root password. Mount the volume at /var/lib/mysql.
Create a manifest named pvc.yaml for the PersistentVolumeClaim:
name: mariadb-pvc
storage: 2000MMi

Create a manifest named mariadb.yaml for the database service:
name: mariadb
- name: mariadb
image: mariadb:11.3
env:
- name: MARIADB_ROOT_PASSWORD
value: my-secret-password
- containerPort: 3306
- mountPath: /var/lib/mysql
name: mariadb-storage
- name: mariadb-storage
claimName: mariadb-pvc

Apply the two manifests as follows:
$ kubectl apply -f pvc.yaml
persistentvolumeclaim/mariadb-pvc created
$ kubectl apply -f mariadb.yaml
pod/mariadb created

2. A PersistentVolume named retain-pv exists with the Retain reclaim policy. Create a PVC
named archive-pvc that binds to this PV and writes a file. Then delete the pod and PVC, patch
the PV to remove the claimRef, and create a new PVC named recover-pvc to reclaim the
same volume.
Create a manifest named archive-pvc.yaml for the PersistentVolumeClaim used by the
writing application:
name: archive-pvc

Create a manifest named archive-writer.yaml for the pod that writes data:
name: archive-writer
- name: writer
command: ["sh", "-c", "echo ArchivedData > /data/archive.txt && sleep 3600"]

mountPath: /data
claimName: archive-pvc

Apply the two manifests and verify that the pod wrote the data:
$ kubectl apply -f archive-pvc.yaml
persistentvolumeclaim/archive-pvc created
$ kubectl apply -f archive-writer.yaml
pod/archive-writer created
$ kubectl exec -it archive-writer -- cat /data/archive.txt
ArchivedData

Delete the pod and PVC:
$ kubectl delete pod archive-writer
pod "archive-writer" deleted
$ kubectl delete pvc archive-pvc
persistentvolumeclaim "archive-pvc" deleted

Patch the PersistentVolume:
$ kubectl patch pv retain-pv -p '{"spec":{"claimRef": null}}'
persistentvolume/retain-pv patched

Create a manifest named recover-pvc.yaml for the PersistentVolumeClaim used by the
reading application:
name: recover-pvc

Create a manifest named recover-reader.yaml for the pod that recovers the data:
name: recover-reader
- name: reader
command: ["sh", "-c", "cat /data/archive.txt && sleep 3600"]
mountPath: /data
claimName: recover-pvc

Apply the two manifests and verify that the data is still present:
$ kubectl apply -f recover-pvc.yaml
persistentvolumeclaim/recover-pvc created
$ kubectl apply -f recover-reader.yaml
pod/recover-reader created
$ kubectl exec -it recover-reader -- cat /data/archive.txt
ArchivedData

## 1. Create a pod with two containers that communicate through a shared volume. One container
should write a message to a file, and the other should read and display the contents of that file.
Create a manifest named shared-volume.yaml for the pod:
name: shared-volume-pod
- name: writer
command: ['sh', '-c', 'echo Hello from writer > /shared/message.txt; sleep 3600']
- name: shared-vol
mountPath: /shared
- name: reader
command: ['sh', '-c', 'sleep 5; cat /shared/message.txt; sleep 3600']
- name: shared-vol
mountPath: /shared
- name: shared-vol
emptyDir: {}

This manifest defines a pod named shared-volume-pod with two containers. The writer
container writes the message Hello from writer to the file /shared/message.txt and stays
alive by executing sleep 3600. The reader container waits five seconds (sleep 5), then reads
and displays the contents of the same file. Both containers share a volume named shared-vol,
which is defined as an emptyDir. This type of volume provides a temporary shared directory
that exists as long as the pod is running.
$ kubectl apply -f shared-volume.yaml
pod/shared-volume-pod created

Check that the pods are running:
$ kubectl get pod shared-volume-pod

shared-volume-pod

2/2

107s

Now access the reader container with option -c reader to see the message in the shared
volume:
$ kubectl exec -it shared-volume-pod -c reader -- sh
/ # cat /shared/message.txt
Hello from writer

## 2. What’s the difference between using a volume in Kubernetes with a PersistentVolumeClaim
and without a PersistentVolumeClaim?
In Kubernetes, you can use volumes either directly in a pod specification or through a
PersistentVolumeClaim. When you define a volume directly — such as with emptyDir,
hostPath, or configMap — the volume is tied to the lifecycle of the pod. For example, a
specification of emptyDir creates a temporary directory that is deleted when the pod is
removed. In contrast, hostPath mounts a directory from the node’s local filesystem, which can
be risky in multinode environments. These types of volumes are simple to use but do not offer
persistence or portability across pods or nodes.
Using a PVC, on the other hand, provides a more robust and flexible approach to managing
storage. A PVC is an abstraction that allows you to request storage resources from the cluster
without needing to know the underlying storage implementation. A PVC binds to a
PersistentVolume (PV), which can be precreated (static) or dynamically provisioned using a
StorageClass.
The PVC approach decouples storage from application logic, ensures data persistence across
pod restarts or rescheduling, and supports access controls, quotas, and reclaim policies. For
any stateful workload, such as databases or file servers, using a PVC is the recommended best
practice.

### 703.3 Kubernetes Package Management
DevOps Tools Engineer v2.0, Exam 701, Objective 703.3
- Understanding the concepts of Charts, Releases and Values
- Installation, upgrading and uninstalling software using Helm
- Specify custom values to configure software installed using Helm
- Awareness of Kustomize
- Awareness of Flux CD and Argo CD
- helm install
- helm upgrade
- helm list
- helm uninstall
- values.yaml

### 703.3 Kubernetes Package Management

Kubernetes has revolutionized the way applications are deployed and managed. But as the
complexity of these applications grows, so does the need for tools that simplify their lifecycle
management. Helm, Kustomize, Flux CD, and Argo CD have emerged as popular solutions for
packaging, deploying, and managing Kubernetes applications.
Helm provides flexibility through templates and value injection, allowing users to override
default configuration values via YAML files or command-line arguments. This capability enables
highly configurable and repeatable deployments.
Although Helm is widely adopted, it is part of a broader ecosystem of tools designed to support
configuration and delivery in Kubernetes environments. Kustomize offers a template-free
alternative that focuses on layering and patching manifests through declarative overlays. For
teams embracing GitOps workflows, tools such as Flux CD and Argo CD bring automation,
consistency, and auditability to application delivery by syncing Kubernetes states directly from Git
repositories.

Helm: Package Management for Kubernetes Applications
Helm is the package manager for Kubernetes. Similar to tools like apt on Ubuntu or yum on Red
Hat, Helm installs, upgrades, and manages Kubernetes applications through preconfigured
packages called charts.
With Helm, deploying complex applications becomes as simple as running a single command. It
customizes deployments using configurable values, making it easy to adapt applications to
different needs. Helm also supports seamless upgrades and rollbacks, so teams can confidently
manage application versions over time. Additionally, administrators can reuse the same
configurations across multiple environments such as development, staging, and production,
ensuring consistency and reducing manual effort.
Helm also provides a templating engine based on templates written in the Go language, allowing
users to parameterize their configurations. This means that image versions, resource limits, or
environment-specific settings can be dynamically injected into the templates at runtime, making
deployments more flexible and adaptable to different environments.
Another advantage of Helm is its ability to handle dependencies between components. For
instance, if an application requires a database, message queue, or other services, these
dependencies can be bundled into the chart or brought in through subcharts. This ensures that all
required components are deployed together in a coordinated manner.
Additionally, Helm streamlines collaboration by allowing teams to share and reuse charts across
projects, reducing duplication of effort and promoting best practices.
It is important to understand Helm’s architecture as well as how to install, upgrade, and uninstall
software using Helm commands. These operations simplify the management of complex
applications and allow for controlled versioning and rollbacks.

Installing Helm in Linux
To install Helm on Linux or macOS, simply run the official installation script provided by the
Helm project. Execute the following command in the terminal:
$ curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
% Total
100 11913

% Received % Xferd
100 11913

Average Speed

Time

Time

Time

Current

Dload

Total

Spent

Left

Speed

Upload

31014

0 --:--:-- --:--:-- --:--:-- 31023

Downloading https://get.helm.sh/helm-v3.17.2-linux-amd64.tar.gz
Verifying checksum... Done.
Preparing to install helm into /usr/local/bin

helm installed into /usr/local/bin/helm

Helm Charts: The Foundation of Kubernetes Packaging
A chart in Helm is a package that contains everything needed to deploy an application on
Kubernetes. It is like a bundle of Kubernetes manifests (YAML files) that describe resources such
as deployments, services, Ingresses, ConfigMaps, and more — but with the added power of
templating. Charts allow reuse, customization, and versioning in Kubernetes configurations.
The standard structure of a Helm chart provides a clear and consistent way to package
Kubernetes applications. It includes a set of directories and files that define the application’s
resources, configurations, and metadata:
my-chart/
Chart.yaml
values.yaml
templates/
charts/

The components are:
Chart.yaml
This file contains metadata about the chart, such as its name, version, description, and
dependencies. It serves as the “header” for the chart and is essential for identifying and
managing it.
values.yaml
This file defines the default configuration values for the chart. These values can be overridden
by users at runtime when installing or upgrading the chart. It adds parameters to templates,
making the chart reusable across different environments.
templates/
This directory contains the Kubernetes manifest templates written in YAML with embedded Go
templating syntax. These templates are rendered into actual Kubernetes manifests during
deployment by substituting values from values.yaml or user-provided overrides.
charts/
This optional directory contains sub-charts or dependencies that the main chart relies on. For
example, if the application requires a database, include a chart for the database here or refer to
it in Chart.yaml.

Helm Releases: Tracking and Controlling Deployments
A release is a specific deployment of a chart into the Kubernetes cluster — a named instance of
that chart, with all the resources and configurations applied. Every time Helm installs a chart,
Helm creates a release.
For example, to install the same chart twice under different release names, enter:
$ helm install myapp-release ./my-chart
$ helm install staging-release ./my-chart

This creates two separate deployments, each isolated, with its own configuration and lifecycle.

Helm Values: Dynamic Configuration Made Simple
Values in Helm are configuration parameters that control the deployment of a chart. They are
defined in the values.yaml file, and can be overridden at install time using the --values, -f, or
--set options on the command line.
For example, suppose this configuration is in values.yaml:
replicaCount: 2
image:
repository: nginx
tag: 1.25

The deployment can be launched with different values taken from another file as follows:
$ helm install my-nginx ./my-chart -f custom-values.yaml

The values can also be specified directly in the command through --set:
$ helm install my-nginx ./my-chart --set replicaCount=3,image.tag=1.26

This flexibility makes Helm highly reusable and customizable. For instance, the same chart can be
used for dev, staging, and production, each with different values.

Installing, Upgrading, and Uninstalling Software Using Helm
Helm simplifies application management on Kubernetes by providing a streamlined way to
install, upgrade, and uninstall software. These operations are performed using Helm commands
that interact with charts.

Installing of Software Using Helm
To install software using Helm, begin by selecting a chart from a repository or by using a locally
available chart. Helm repositories are centralized locations where charts are stored and
versioned, making it easy to discover and deploy applications.
One of the most popular public repositories is Bitnami. Add the Bitnami repository (if it is not
already present) as follows:
$ helm repo add bitnami https://charts.bitnami.com/bitnami
"bitnami" has been added to your repositories

Now update the repository:
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "bitnami" chart repository
Update Complete. ⎈Happy Helming!⎈

Check the repository list with:
$ helm repo list

URL

bitnami https://charts.bitnami.com/bitnami

The installation process is initiated using the helm install command, which creates a new
release in the Kubernetes cluster. For example, install an Nginx application using:
$ helm install my-nginx bitnami/nginx
NAME: my-nginx
LAST DEPLOYED: Thu Apr

3 20:47:58 2025

NOTES:
CHART NAME: nginx
CHART VERSION: 19.0.4
APP VERSION: 1.27.4
NGINX can be accessed through the following DNS name from within the cluster:
my-nginx.default.svc.cluster.local (port 80)

This command installs the Nginx chart with the release name my-nginx. Helm creates all
necessary Kubernetes resources, including the deployment, the service, and ConfigMaps.
During installation, the Helm client provides helpful output detailing the resources that were
created, the current status of the release, and any additional configuration steps needed.
The helm install command is versatile and can install charts from multiple sources. A chart can
be installed directly from a chart repository, as demonstrated earlier. Alternatively, use a local
chart archive by specifying a .tgz file, such as:
$ helm install foo foo-0.1.1.tgz.

It is also possible to install a chart from an unpacked chart directory by providing the path like the
following:
$ helm install foo path/to/foo

To install a chart by specifying a full URL pointing to a chart package, enter something like:
$ helm install foo https://example.com/charts/foo-1.2.3.tgz.

Check the resources with:
$ kubectl get all

pod/my-nginx-64979b59-s2cqf

service/kubernetes

46m
service/my-nginx

10.96.129.116

<pending>

80:32408/TCP,443:32521/TCP

UP-TO-DATE

AVAILABLE

deployment.apps/my-nginx

DESIRED

replicaset.apps/my-nginx-64979b59

To see all Helm releases currently deployed, enter:
$ helm list

NAMESPACE

CHART

REVISION

UPDATED

APP VERSION

my-nginx

default

nginx-19.0.4

2025-04-03 20:47:58.927714719 -0300 -03 deployed

1.27.4

To deploy an application quickly without specifying a custom release name, Helm provides the
--generate-name option. This option tells Helm to automatically generate a unique name for the
release.
For example, running helm install bitnami/mysql --generate-name installs the MySQL
chart from the Bitnami repository and assigns it a randomly generated name, such as mysql1743725550. This is especially useful for testing or deploying multiple instances of the same chart
without having to manually manage unique release names. An example follows:
$ helm install bitnami/mysql --generate-name
NAME: mysql-1743725550
LAST DEPLOYED: Thu Apr

3 21:12:34 2025

NOTES:
CHART NAME: mysql
CHART VERSION: 12.3.2
APP VERSION: 8.4.4

Overview of the Features Included in a Chart
To get a quick overview of the features included in the MySQL chart, enter:
$ helm show chart bitnami/mysql

For more detailed information, including values, README, and chart metadata, use:
$ helm show all bitnami/mysql

Upgrading a Release
To change the configuration or update the chart version, use helm upgrade. For example, to
change the replica count of the Nginx deployment, enter:
$ helm upgrade my-nginx bitnami/nginx --set replicaCount=3
Release "my-nginx" has been upgraded. Happy Helming!

This updates the running my-nginx release by applying a new value. Helm performs a rolling
update and keeps track of version history.
To view the history of upgrades for a release, enter:
$ helm history my-nginx
REVISION

UPDATED

CHART

APP VERSION DESCRIPTION

Thu Apr

3 20:47:58 2025

superseded

nginx-19.0.4

1.27.4

Install

Thu Apr

3 20:52:03 2025

deployed

nginx-19.0.4

1.27.4

Upgrade

complete
complete

Roll back to a previous version using:
$ helm rollback my-nginx 1
Rollback was a success! Happy Helming!

Specifying Custom Values to Configure Software Installed Using Helm
One of Helm’s most powerful features is the ability to customize application deployments using

configuration values. Every Helm chart comes with a file called values.yaml that defines default
settings for the application, such as its image names, replica counts, and ports. These values can
be overridden during installation or upgrades to tailor the deployment to a specific environment.
To save the default values for a chart (for example, Bitnami’s Nginx chart) to a file, use a
command such as:
$ helm show values bitnami/nginx > custom-values.yaml

To save the output without the comments, enter:
$ helm show values bitnami/nginx | grep -v "#" > custom-values.yaml

Once a chart is installed, view the values injected into that release using:
$ helm get values my-nginx --all

To change a configuration, not all the values from the default values.yaml file have to be
specified. All that is needed is a simplified file containing only the fields to override. For example,
create a file named custom-values.yaml with the following content:
replicaCount: 5
image:
repository: bitnami/nginx
tag: 1.25
pullPolicy: IfNotPresent
service:
type: ClusterIP

This file overrides only the specified settings when used with a Helm install or upgrade
command. All other values will fall back to the chart’s defaults.
To install a chart for the first time while applying custom values, enter:
$ helm install my-other-nginx bitnami/nginx -f custom-values.yaml
NAME: my-other-nginx
LAST DEPLOYED: Thu Apr

3 21:07:31 2025

NOTES:
CHART NAME: nginx
CHART VERSION: 19.0.4
APP VERSION: 1.27.4

To upgrade an existing installation with new values, use:
$ helm upgrade my-nginx bitnami/nginx -f custom-values.yaml
Release "my-nginx" has been upgraded. Happy Helming!

Uninstalling a Release
To remove an application completely, use the uninstall command:
$ helm uninstall my-nginx
release "my-nginx" uninstalled

This deletes all Kubernetes resources created by the Helm release. After this operation, Helm also
removes the release information from its internal history. To confirm removal, enter:
$ helm list

If nothing appears, the release has been removed.
A helm uninstall command with the --keep-history option keeps the release history:
$ helm uninstall my-other-nginx --keep-history
release "my-other-nginx" uninstalled

To request information about that release, enter:
$ helm status my-other-nginx

Finding Charts With helm search
Helm provides a powerful search tool that permits the discovery of charts from different sources.
There are two main ways to search:
helm search hub
queries the Artifact Hub, a centralized catalog of Helm charts from a wide range of public
repositories.
helm search repo
searches the repositories that have already been added to the local Helm client using helm
repo add. This search is performed locally and does not require an internet connection.
For example, to find publicly available charts on Artifact Hub related to WordPress, enter:
$ helm search hub wordpress
URL

CHART VERSION

https://artifacthub.io/.../wordpress-...

APP VERSION

DESCRIPTION

1.0.2

1.0.0

A Helm chart for

0.1.0

1.1

this is my wordpress

deploying...
https://artifacthub.io/.../kube-wordp...
package

The helm search hub --list-repo-url exposes the actual Helm repository URLs. This
command comes in handy for adding a new repository:
$ helm repo add [NAME] [URL]

Use helm search repo to list available charts from the repositories that were already added to
the local Helm client:
$ helm search repo

CHART VERSION

APP VERSION

DESCRIPTION

bitnami/airflow

22.7.2

2.10.5

Apache

11.3.5

2.4.63

Apache HTTP

Airflow is a tool to express and execute...
bitnami/apache
Server is an open-source HTTP serve...

Kustomize
Although Helm has become a standard tool for managing Kubernetes applications through
templated charts, it is essential to understand alternative and complementary tools that offer
different philosophies and benefits. One such tool is Kustomize, which provides a template-free
approach to configuration customization.
Unlike Helm, which uses a templating engine to inject values into YAML files, Kustomize allows a
team to define a base set of manifests and then create overlays that modify or extend those base
definitions. This makes it easier to manage environment-specific configurations (e.g.,
development, staging, production) in a clean and declarative manner without relying on external
tooling or complex logic.
Since Kustomize is built into kubectl itself (starting with Kubernetes v1.14), it is widely
supported and can be used out-of-the-box to apply layered configurations with minimal setup.
Kustomize encourages a structure that separates configuration from logic. Write the application
manifests once and apply different patches for each environment, such as modifying labels,
container images, resource limits, or ConfigMaps.
Kustomize is particularly useful in teams that prefer to stay close to raw Kubernetes YAML and
prioritize transparency and simplicity in deployment definitions. Its declarative layering model is
ideal for infrastructure teams managing multiple clusters or environments with similar core
applications but different configurations.

Flux CD and Argo CD
For organizations embracing GitOps — a methodology where Git is the single source of truth for
both infrastructure and application definitions — Flux CD and Argo CD are indispensable. Both
are continuous delivery controllers for Kubernetes that synchronize the state of the cluster with
what is defined in Git repositories. This means that any change committed to Git (whether a Helm
chart, Kustomize overlay, or plain YAML) is automatically deployed to the cluster, creating a fully
automated and auditable delivery pipeline. With GitOps, rollback is as simple as reverting a Git
commit, and every change is tracked through version control.
Argo CD provides a web interface, command-line interface, and API that allow teams to visualize
and manage the synchronization state of applications. It supports advanced deployment strategies
such as blue/green, and can track Helm and Kustomize projects side by side.
Flux CD, on the other hand, emphasizes automation and Git-native workflows, and is tightly
integrated with the Cloud Native Computing Foundation (CNCF) ecosystem.

Both tools enable drift detection, alerting the administrator if something in the cluster changes
that is not reflected in Git. In this way they help to ensure operational consistency and
compliance.
In practice, many teams use Helm in combination with Kustomize or GitOps tools, rather than
choosing just one. For example, Helm may be used to package an application, Kustomize to define
environment-specific configurations, and Argo CD to automate and enforce those definitions from
Git. By understanding and integrating these tools effectively, DevOps teams can build robust,
scalable, and fully automated deployment pipelines that support modern microservices and
Infrastructure as Code practices.

1. Install the Bitnami Nginx Helm chart using the release name web-server.

2. Install the Bitnami MySQL chart and set the root password to SuperSecret123.

3. Upgrade the web-server release to use three replicas.

4. List all the Helm releases currently installed in your cluster.

## 5. Uninstall the my-database MySQL release from your cluster.

## 1. Download the default values.yaml file for the Bitnami Nginx chart and compare it to a
minimal custom version that changes only the replica count and image tag.

## 2. Install the Bitnami MariaDB chart, then use kubectl to inspect and validate how the Helm
chart created Kubernetes resources.

Kubernetes offers a flexible platform for deploying and managing applications, but its complexity
requires efficient tools to streamline application lifecycle management. Helm plays a central role
by packaging Kubernetes resources into reusable charts, allowing developers to install, configure,
upgrade, and roll back applications with ease. Through powerful templating and values.yaml
custom definitions, Helm supports environment-specific configurations and encourages
repeatable, version-controlled deployments. Combined with its support for managing
dependencies and sharing charts across teams, Helm brings structure and automation to the
Kubernetes ecosystem.
Beyond Helm, tools like Kustomize, Flux CD, and Argo CD expand the possibilities for
configuration and delivery. Kustomize provides a declarative and template-free way to manage
layered configurations, making it ideal for teams working with native Kubernetes manifests. Flux
CD and Argo CD bring GitOps automation to the table, continuously synchronizing cluster state
with Git repositories.

## 1. Install the Bitnami Nginx Helm chart using the release name web-server.
$ helm install web-server bitnami/nginx

2. Install the Bitnami MySQL chart and set the root password to SuperSecret123.
$ helm install my-database bitnami/mysql --set auth.rootPassword=SuperSecret123

To check that the password is correct, enter:
$ kubectl get secret --namespace default my-database-mysql -o jsonpath="{.data.mysqlroot-password}" |

base64 -d

SuperSecret123

## 3. Upgrade the web-server release to use three replicas.
$ helm upgrade web-server bitnami/nginx --set replicaCount=3

## 4. List all the Helm releases currently installed in your cluster.
$ helm list

## 5. Uninstall the my-database MySQL release from your cluster.
$ helm uninstall my-database

## 1. Download the default values.yaml file for the Bitnami Nginx chart and compare it to a
minimal custom version that changes only the replica count and image tag.
Save the default values to a file:
$ helm show values bitnami/nginx > default-values.yaml

Create a new file named custom-values.yaml:
replicaCount: 2
image:
tag: 1.27

Install the chart using the custom values:
$ helm install test-nginx bitnami/nginx -f custom-values.yaml

To explore the difference between the two value sets, get the actual values:
$ helm get values test-nginx --all > actual-values.yaml

Use diff using to see differences:
$ diff default-values.yaml actual-values.yaml

## 2. Install the Bitnami MariaDB chart, then use kubectl to inspect and validate how the Helm
chart created Kubernetes resources.
To install MariaDB, enter:
$ helm install mariadb-release bitnami/mariadb --set auth.rootPassword=Test123

Use the following kubectl command to inspect the deployment:

$ kubectl get all -l app.kubernetes.io/instance=mariadb-release

Identify what Kubernetes resources were created (e.g., StatefulSet, Service, Secrets).

DevOps Tools Engineer (Version 2.0) |

## Topic 704: Security and Observability

### 704.1 Cloud Native Security
DevOps Tools Engineer v2.0, Exam 701, Objective 704.1
4
- Understand core IT infrastructure components and their role in deployment
- Understand common IT infrastructure security risks and ways to mitigate them
- Understand supply chain security and dependencies on foreign code
- Understand common application security risks and ways to mitigate them
- Understand the concepts of asymmetric cryptography and digital certificates
- Understand the principles of common standard for authentication and authorization
- Understand how to manage user credentials and how to use advanced authentication
technologies
- Service exploits, brute force attacks, and denial of service attacks
- Security updates, packet filtering, load balancers and application gateways
- Cross site scripting, verbose error reports
- API authentication
- Buffer overflows, SQL injections
- API access, permissions, verbosity and rate limits
- CORS headers and CSRF tokens

- Common Vulnerabilities and Exposures (CVE)
- CVE IDs and CVE scores
- Public key, private key, X.509 certificate, certificate authority
- TLS, transport encryption
- Single sign-on (SSO)
- OAuth2, OpenID Connect and SAML
- Two-factor authentication (2FA) and multi-factor authentication (MFA)
- One-time passwords (OTP), time-based one-time passwords (TOTP)
- Authenticator applications
- Password hashing and salting

### 704.1 Cloud Native Security

Understanding the foundational components of IT infrastructure is crucial for successfully
deploying and maintaining secure, scalable, and high-performing applications. Within traditional
data centers as well as cloud-native environments, components such as load balancers,
application gateways, packet filtering, and consistent security updates all serve as essential
building blocks. These technologies ensure that traffic is distributed efficiently, application access
is secured, and potential vulnerabilities are addressed before they can be exploited.

The Importance of IT Infrastructure in Deployment
The following sections examine some of the key infrastructure components and their roles in
deployed applications.

Load Balancers: Ensuring High Availability and Reliability
One of the most critical components in modern IT infrastructure is the load balancer. Load
balancers distribute incoming network traffic across multiple servers to ensure that no single
server becomes overwhelmed. This distribution helps maintain high availability and reliability,

which are essential for delivering a consistent user experience.
A load balancer routes traffic intelligently based on factors such as server capacity, current load,
and geographic location. Additionally, load balancers can monitor server health and
automatically reroute traffic away from failed or underperforming servers, further enhancing
system resilience.
In security, load balancers can act as a first line of defense by hiding backend servers from direct
exposure to the internet and by encrypting traffic between clients and servers.
Kubernetes can expose a service using type LoadBalancer, which provisions a cloud-based
external load balancer to distribute traffic to the application pods. Examples of such cloud
services include: AWS Elastic Load Balancer (ELB), Azure Load Balancer and Google Cloud Load
Balancer.
A load balancer has the capability to perform SSL offloading, also known as SSL termination, by
taking over the task of managing SSL/TLS encryption and decryption. Instead of passing encrypted
traffic directly to the backend servers, the load balancer handles the TLS handshake and decrypts
the data before forwarding it internally. This approach significantly reduces the computational
load on backend services, because they no longer need to process encrypted traffic, allowing them
to operate more efficiently and scale more effectively.

Application Gateways: Managing and Securing Application Traffic
Another important component is the application gateway, an intermediary that manages and
secures application traffic. Unlike traditional load balancers, application gateways operate at the
application layer (layer 7 of the OSI model) and provide advanced features such as request
inspection, content-based routing, and SSL termination.
Application gateways inspect incoming requests to ensure they comply with security policies and
route them to the appropriate backend services.
Application gateways enhance security by protecting against common threats such as cross-site
scripting (XSS) and SQL injection attacks. They can also cache frequently accessed content,
reducing the load on backend servers and improving response times for users.

Packet Filtering: Controlling Network Traffic
At the network level, firewalls perform packet filtering to control traffic based on predefined
rules. Packet filtering works by examining individual packets of data as they pass through the
network and determining whether to allow or block them based on criteria such as source IP
address, destination IP address, port numbers, and protocols.

By filtering out malicious or unnecessary traffic, packet filtering helps reduce the attack surface
and reduces the risk that illegitimate traffic reaches. While packet filtering is effective for basic
traffic control, it is often combined with more advanced techniques such as stateful inspection
and intrusion detection to provide comprehensive network security.

Security Updates: Protecting Against Vulnerabilities
No discussion of IT infrastructure would be complete without addressing the importance of
security updates, also known as patches or upgrades. Software vulnerabilities are constantly
being discovered, and attackers are quick to exploit them if left unpatched. Security updates are
released by vendors to address these vulnerabilities, fix bugs, and improve overall system
security.

Common IT Infrastructure Security Risks and Ways to Mitigate
Them
In today’s interconnected digital world, IT infrastructure is constantly under threat from a variety
of security risks. Successful attacks can compromise the confidentiality, integrity, and availability
of systems, leading to data breaches, service disruptions, and financial losses.

Service Exploits: Gaining Unauthorized Access
One of the most prevalent security risks in IT infrastructure is service exploits, which occur when
attackers exploit vulnerabilities in software services to gain unauthorized access. An unpatched
vulnerability in a server could allow attackers to execute arbitrary commands on it, or escalate
privileges to take over the whole computer or network.
Services such as web servers, databases, and email servers are frequent targets because they are
exposed to external networks and often have complex configurations that can introduce
weaknesses.
To mitigate this risk, it is essential to keep all software up to date with the latest security patches.
Additionally, organizations should conduct regular vulnerability assessments and penetration
testing to identify and address potential weaknesses before attackers can exploit them.

Brute Force Attacks: Exhaustive Trial-and-Error Methods
Brute force attacks are another common threat, where attackers attempt to guess passwords or
encryption keys through exhaustive trial and error. These attacks are particularly dangerous for
systems with weak or easily guessable credentials, as the attack can eventually succeed given

enough time and computational resources.
To defend against brute force attacks, organizations should enforce strong password policies.
Multi-factor authentication (MFA) adds an additional layer of security by requiring users to
provide two or more verification factors, making it significantly harder for attackers to gain
access even if they guess a password. Rate limiting and account lockout mechanisms can also help
by restricting the number of login attempts within a specific timeframe.

Denial of Service (DoS) Attacks: Overwhelming Systems
Denial of service (DoS) attacks aim to overwhelm a system or network, rendering it unavailable to
legitimate users. These attacks flood the target with excessive traffic or resource requests,
exhausting its capacity to respond. Distributed denial of service (DDoS) attacks, a variant of DoS,
marshall multiple compromised systems that work together to amplify the attack.
Mitigating DoS attacks requires a combination of proactive and reactive measures. Load balancers
and content delivery networks (CDNs) can help distribute traffic and absorb malicious requests.
Firewalls and intrusion detection/prevention systems (IDS/IPS) can detect and block suspicious
traffic patterns. Additionally, organizations should implement rate limiting and traffic filtering to
reduce the impact of large-scale attacks. For critical systems, redundant infrastructure and
failover mechanisms can help maintain continuity even during an attack.

Buffer Overflows: Writing Excessive Data
A buffer overflow occurs when excessive data is written into a buffer, exceeding its allocated size.
This can overwrite adjacent memory locations, potentially allowing attackers to execute arbitrary
code or crash the system. Buffer overflows are commonly exploited in applications with poor
input validation or insecure coding practices.
To prevent buffer overflows, developers should adopt secure coding practices, such as using
programming languages and libraries that include built-in protections against these
vulnerabilities. Input validation and bounds checking are critical to ensuring that user-supplied
data does not exceed expected limits. Regular code reviews and analysis tools (both static and
dynamic) can help identify and fix potential buffer overflow issues before deployment.

SQL Injection: Manipulating Databases
SQL injection is a type of attack that exploits vulnerabilities in SQL queries to manipulate
databases. Attackers inject malicious SQL code into input fields, tricking the application into
executing unintended commands. This can lead to unauthorized access to sensitive data, data
corruption, or even complete database compromise.

To mitigate SQL injection risks, developers should use parameterized queries or prepared
statements, which separate SQL code from user input. Input validation and sanitization are also
essential to ensure that only expected data types and formats are accepted. A web application
firewall (WAF) can provide an additional layer of protection by filtering out malicious requests
before they reach the application.

Cross-Site Scripting (XSS): Injecting Malicious Scripts
Cross-site scripting (XSS) is a vulnerability that allows attackers to inject malicious scripts into web
pages viewed by other users. These scripts execute in the context of the victim’s browser,
potentially stealing sensitive information such as session cookies, login credentials, or personal
data.
To mitigate XSS risks, developers should implement robust input validation and output encoding.
Input validation ensures that only expected data types and formats are accepted, while output
encoding converts special characters into safe representations before rendering them in the
browser. Additionally, modern frameworks often include built-in protections against XSS, such as
Content Security Policy (CSP) headers, which restrict the sources of executable scripts. Regular
security testing, including penetration testing and automated scanning, helps identify and address
potential XSS vulnerabilities.

Common Forms of Application-Level Security
Application-level security is among the most critical challenges faced by developers and
organizations today. Vulnerabilities in the design, implementation, or configuration of
applications (including weak password storage) make them susceptible to attacks such as crosssite scripting, unauthorized API access, and abuse of services through excessive requests.
Understanding and mitigating common application security risks is crucial for building secure
and resilient systems. Targeted strategies are needed to address risks effectively.

Common Vulnerabilities and Exposures (CVE): Tracking Known Risks
The Common Vulnerabilities and Exposures (CVE) system provides a standardized list of known
security vulnerabilities, along with unique identifiers (CVE IDs) and severity ratings (CVE scores).
This system helps organizations stay informed about emerging threats and prioritize their
mitigation efforts based on the severity of each vulnerability.
Regularly monitoring the CVE database allows security teams to identify vulnerabilities that could
affect their systems and apply patches or workarounds promptly. Automated tools, such as
vulnerability scanners, can integrate with the CVE database to streamline the process of

identifying and addressing risks. By staying proactive, organizations can reduce their exposure to
known threats and maintain stronger security.

API Authentication: Ensuring Authorized Access
API authentication is essential for ensuring that only authorized users or systems can access APIs.
Without proper authentication, APIs are vulnerable to unauthorized access, data breaches, and
abuse.
To enhance API security, developers should enforce strong authentication mechanisms and
regularly rotate credentials such as API keys. Role-based access control (RBAC) ensures that users
or systems have access only to the resources and actions permitted by their roles. Additionally,
logging and monitoring API requests helps detect suspicious activities, enabling timely responses
to potential threats.

Password Hashing and Salting: Securing User Credentials
Storing passwords securely is a fundamental aspect of application security. Plain-text storage of
passwords is highly vulnerable to data breaches, exposing users to significant risks. To mitigate
this, developers should use password hashing and salting.
When effective hashing and salting are in place, an attacker who gains access to the hashed
passwords cannot easily reverse-engineer the original credentials. Developers should also enforce
strong password policies, requiring users to create complex passwords that are resistant to bruteforce attacks. Multi-factor authentication (MFA) further enhances security by adding an additional
layer of verification beyond passwords.

Rate Limiting: Preventing Abuse of Services
Rate limiting prevents the abuse of APIs and services by restricting the number of requests a user
or system can make within a specific timeframe. Without rate limiting, attackers can overwhelm
APIs with excessive requests, leading to denial of service, resource exhaustion, or data leakage.
To implement rate limits effectively, developers should define thresholds based on typical usage
patterns and enforce them at the application or infrastructure level.

Supply Chain Security and Dependencies on Foreign Code
Modern software development relies on third-party libraries, frameworks, and APIs to accelerate
development and enhance functionality. While these dependencies bring significant benefits, they
also introduce risks related to supply chain security. Vulnerabilities or malicious code in third-

party components can compromise the integrity of an application, making it essential to
understand and mitigate these risks.

Verbose Error Reports: Exposing Sensitive Information
One common risk in software development is the use of verbose error reports, which provide
detailed information about system failures. While these reports are helpful for debugging during
development, they can inadvertently expose sensitive information when enabled in production
environments. For example, verbose error messages may reveal database schemas, server paths,
or authentication mechanisms, giving attackers valuable insights into the application’s
architecture.
To mitigate this risk, developers should configure applications to display generic error messages
in production environments while logging detailed errors securely on the server side.
Additionally, regular audits of error handling mechanisms can help ensure that no sensitive
information is leaked through error reports. By adopting a “least privilege” approach to error
reporting, organizations can minimize the risk of exposing critical details to potential attackers.

API Access, Permissions, Verbosity, and Rate Limits: Securing External
Integrations
Applications frequently rely on APIs to interact with third-party services, but insecure API access
can introduce significant vulnerabilities. Misconfigured permissions, excessive verbosity in
responses, and lack of rate limiting can all lead to abuse or exploitation by malicious actors.
When it comes to permissions, it is critical to ensure that APIs are accessed with the minimum
privileges necessary to perform their intended function. Granting overly permissive access
increases the risk that an attacker could exploit the API to perform unauthorized operations,
compromise data, or alter system behavior. Properly implementing least privilege in access
controls helps contain the blast radius in the event of a breach and supports better overall
security hygiene.
Another important consideration is verbosity. APIs should be designed to return only the essential
data required by the client, avoiding exposure of unnecessary internal details. Excessive verbosity
can inadvertently reveal sensitive information about the system’s structure, database schema, or
debugging data that attackers could use for reconnaissance and exploitation.
Rate limiting is a key defensive mechanism to prevent abuse. By restricting the number of API
requests allowed per user or system within a specific timeframe, rate limits protect services from
being overwhelmed by malicious traffic or brute-force penetration attacks. Without rate limiting,
APIs are more vulnerable to denial of service (DoS) attacks and uncontrolled data scraping, which

can degrade performance and expose sensitive data.

CORS Headers: Defining Access Policies
Cross-origin resource sharing (CORS) headers play a critical role in securing web applications by
defining which external domains are allowed access to resources. Misconfigured CORS headers
can inadvertently expose sensitive data to unauthorized domains, enabling cross-origin attacks.
For example, overly permissive CORS policies that allow access from any domain (AccessControl-Allow-Origin: *) can enable malicious websites to retrieve sensitive information
from the application. To mitigate this risk, developers should explicitly specify trusted domains in
CORS headers and avoid using wildcard configurations unless absolutely necessary. CORS policies
should be reviewed periodically to ensure that they align with the application’s security
requirements and do not introduce unintended vulnerabilities.

CSRF Tokens: Preventing Unauthorized Requests
Cross-site request forgery (CSRF) attacks occur when attackers trick users into performing
unintended actions on a web application where they are authenticated. For example, an attacker
might craft a malicious link that submits a form or initiates a transaction on behalf of the user.
To prevent CSRF attacks, applications can use CSRF tokens, which are unique, unpredictable
values embedded in forms or requests. These tokens validate that the request originates from a
legitimate source and not from a malicious actor. When a request is received, the server verifies
the token before processing the action. Implementing CSRF tokens alongside other security
measures, such as SameSite cookies, further strengthens protection against unauthorized
requests.

Securing Dependencies: A Holistic Approach
Supply chain security extends beyond individual components like error reports, APIs, CORS
headers, and CSRF tokens. It requires a holistic approach to managing third-party dependencies
and ensuring their integrity throughout the development lifecycle.
Dependency management plays a crucial role in maintaining application security. Third-party
libraries must be reviewed regularly, and updated when necessary, to address known
vulnerabilities that might exist in older versions. Over time, security flaws are often discovered in
widely used packages. Failing to update them can leave systems exposed. Using automated tools
such as dependency scanners helps teams identify outdated or risky components and prioritize
remediation based on severity and usage.

Code reviews are another important layer of defense, especially when integrating external code.
Thoroughly reviewing any third-party contributions ensures they follow secure coding practices
and do not introduce hidden vulnerabilities. This process should include checks for improper
input handling, hardcoded credentials, and any potentially dangerous logic that could
compromise the integrity of the application.
Establishing vendor trust is equally important. Before integrating third-party services or code,
organizations should assess the reputation and security posture of the vendor. This includes
reviewing their security policies, history of vulnerability disclosures, and responsiveness to
incidents. Trustworthy vendors are more likely to maintain secure products, provide timely
updates, and follow responsible disclosure practices — making them safer partners in your
application ecosystem.

## 1. You’re deploying a web application that is expected to experience unpredictable spikes in
traffic. How could a load balancer help maintain performance and reliability during these
spikes?

## 2. An organization wants to protect its application from SQL injection and cross-site scripting
(XSS) attacks. Would a load balancer be sufficient, or should they use an application gateway?
Why?

3. What are the risks of not applying regular security updates to servers and applications in a

## 4. You are deploying a microservices-based application where each service communicates over
HTTP. How would packet filtering contribute to the security of this system?

## 1. You’re deploying a healthcare application that handles sensitive patient data. The system is
composed of several microservices and uses third-party libraries for encryption and
authentication. The team is considering skipping regular updates to these dependencies due to
time constraints. As an engineer responsible for security, how would you argue against this
decision, and what measures would you propose instead?

This lesson explored how load balancers maintain service availability under high traffic, how
application gateways provide intelligent traffic control and protection, how packet filtering
enforces network boundaries, and why regularly applying security updates is a non-negotiable
part of maintaining system integrity. Common attacks on both IT infrastructure and applications
were described, with measures that help mitigate them. Together, these elements form the
backbone of resilient infrastructure — enabling organizations to support reliable applications
while minimizing risk.

## 1. You’re deploying a web application that is expected to experience unpredictable spikes in
traffic. How could a load balancer help maintain performance and reliability during these
spikes?
A load balancer can distribute incoming traffic across multiple servers, preventing any single
server from becoming overwhelmed. During traffic spikes, this helps maintain consistent
response times and reduces the risk of server crashes. Additionally, the load balancer can
detect server failures and reroute traffic to healthy servers, ensuring high availability.
2. An organization wants to protect its application from SQL injection and cross-site scripting
(XSS) attacks. Would a load balancer be sufficient, or should they use an application gateway?
Why?
Although a load balancer distributes traffic, it typically doesn’t inspect the content of requests
in detail. An application gateway operates at the application layer and can inspect data
payloads, such as HTTP requests, for malicious payloads, This makes an application gateway
uniquely suitable for defending against application-level attacks such as XSS and SQL injection.
Therefore, the organization should use an application gateway to provide deeper inspections
and policy enforcement.
3. What are the risks of not applying regular security updates to servers and applications in a
Failing to apply security updates can leave known vulnerabilities unpatched, making the
system an easy target for attackers. This increases the risk of exploitation through service
exploits, data breaches, or system compromise. Unpatched systems are a common vector for
ransomware and other malware attacks. Regular updates are critical to maintaining a secure
and resilient environment.
4. You are deploying a microservices-based application where each service communicates over
HTTP. How would packet filtering contribute to the security of this system?
Packet filtering helps control which traffic is allowed to enter or leave the system based on IP
addresses, ports, and protocols. In a microservices environment, packet filtering can limit
external access to endpoints that have been exposed externally, while preventing unauthorized
internal communication. This reduces the attack surface and ensures that only expected and
authorized traffic flows between services.

## 1. You’re deploying a healthcare application that handles sensitive patient data. The system is
composed of several microservices and uses third-party libraries for encryption and
authentication. The team is considering skipping regular updates to these dependencies due to
time constraints. As an engineer responsible for security, how would you argue against this
decision, and what measures would you propose instead?
Skipping regular updates to third-party dependencies poses a significant security risk,
especially in systems handling sensitive data such as healthcare records. Vulnerabilities in
outdated libraries can be exploited by attackers to gain unauthorized access, compromise data
integrity, or disrupt service availability. In regulated industries, failing to patch known issues
can also lead to non-compliance with security standards like HIPAA, opening an organization
to expensive legal fees and lawsuits.
To mitigate this, a security advocate would propose implementing automated dependency
scanning tools to monitor for known vulnerabilities (e.g., using CVE databases). Additionally,
adopting a regular update schedule, combined with a staging environment for safe testing
before deployment, helps balance security and stability. By prioritizing critical updates and
maintaining visibility into third-party code, the system remains secure without disrupting
development velocity.

### 704.1 Cloud Native Security

Securing communication channels and validating identities are more critical than ever. Whether
you are sending sensitive data over a network, logging into a secure system, or integrating
applications via APIs, robust security mechanisms are required to prevent unauthorized access,
data breaches, and impersonation attacks.
At the core of this secure infrastructure lies asymmetric cryptography, a technique that relies on a
pair of mathematically related keys to encrypt, decrypt, sign, and verify data. This foundational
concept ensures confidentiality, integrity, and authenticity in digital communications, and
underlies technologies such as HTTPS, TLS, and secure email. The lesson also introduces digital
certificates based on the X.509 standard, which enable trust between parties through trusted
entities known as certificate authorities (CAs).
In addition to securing data in transit, verifying who is accessing systems — and what they are
allowed to do — is equally essential. That is where authentication and authorization standards
come into play. This lesson explores OAuth2, which facilitates secure delegated access to APIs
without exposing passwords, and OpenID Connect (OIDC), which adds a robust identity layer on
top of OAuth2 to authenticate users in web and mobile applications. The lesson also describes

SAML, an XML-based standard often used in enterprise single sign-on (SSO) environments,
particularly where centralized identity management is required.
Finally, this lesson offers best practices for managing user credentials, such as secure password
storage and rotation, and introduces several advanced authentication technologies.

Concepts of Asymmetric Cryptography and Digital Certificates
Securing communications over networks is paramount in order to protect sensitive data from
interception, tampering, or unauthorized access. At the heart of secure communication lie
asymmetric cryptography and digital certificates.

Asymmetric Cryptography: Public and Private Keys
Asymmetric cryptography, also known as public-key cryptography, uses a pair of mathematically
related keys: a public key and a private key.
The public key can be shared openly and is used for encryption or verifying digital signatures. The
private key is kept secret by its owner and is used for decryption or creating digital signatures.
This dual-key system ensures confidentiality, integrity, and authenticity in communications.
Asymmetric cryptography supports confidentiality by allowing data to be encrypted with the
recipient’s public key, and ensures that only the recipient, who holds the corresponding private
key, can decrypt and access the message. This guarantees that sensitive information remains
protected during transmission.
Additionally, asymmetric cryptography provides integrity and authenticity through the use of
digital signatures. A sender can sign a message using their private key, and the recipient can
verify the signature with the sender’s public key, confirming both the origin of the message and
that its contents have been safe from tampering.
Together, these properties make asymmetric encryption the foundation of many security
protocols, such as SSL/TLS and PGP, which rely on public key infrastructure (PKI) to establish trust
and protect data in motion.

X.509 Certificates: Verifying Identities
X.509 is a standard format for digital certificates used to verify the identity of entities (such as
websites, servers, or individuals) in secure communications. These certificates bind a public key
to an identity and are issued by trusted third parties known as certificate authorities (CAs).
An X.509 certificate typically contains:

- The entity’s public key.
- Identifying information about the entity (e.g., domain name, organization name).
- The CA’s digital signature, which validates the authenticity of the certificate.
- Expiration dates to ensure certificates remain time-bound.
When a client connects to a server, the server presents its X.509 certificate. The client verifies the
certificate by checking the CA’s signature and ensuring that the certificate has not expired or been
revoked. This process establishes trust and enables secure communication.

Certificate Authorities (CAs): Establishing Trust
A certificate authority (CA) is a trusted entity responsible for issuing and validating digital
certificates. CAs play a critical role in the public key infrastructure (PKI) by acting as
intermediaries that vouch for the authenticity of entities.
There are two main types of CAs: root CAs and intermediate CAs. Root CAs are the top-level
authorities whose certificates are trusted by default and pre-installed in operating systems and
web browsers. Root CAs typically do not issue certificates directly; instead, they delegate this task
to intermediate CAs. These subordinate CAs operate under the authority of the root and are
responsible for issuing certificates to end entities, forming what is known as a chain of trust.

Transport Layer Security (TLS): Securing Communication
Transport Layer Security (TLS) is a cryptographic protocol that provides encryption,
authentication, and data integrity for secure communication over a network. It is widely used to
secure web traffic (HTTPS), email, and other internet protocols. It is the successor to the familiar
Secure Sockets Layer (SSL) protocol.
TLS establishes a secure connection by using asymmetric cryptography during the initial
handshake, where the server presents an X.509 certificate and it is verified by the client through a
trusted CA. After verification, a symmetric session key is securely exchanged and then used for all
subsequent encrypted communication. This hybrid approach ensures both strong authentication
and efficient data transfer.

Transport Encryption: Protecting Data in Transit
Transport encryption refers to the encryption of data during transmission to protect it from
interception or eavesdropping. Protocols such as TLS implement transport encryption by
encrypting data packets before they are sent over the network and decrypting them upon receipt.

Principles of Common Standards for Authentication and
Authorization
Several standards and protocols have been developed to streamline authentication (verifying who
a user is) and authorization (granting access to specific resources).

Single Sign-On (SSO): Simplifying Authentication
Single sign-on (SSO) allows users to authenticate once and gain seamless access to multiple
systems or applications without needing to log in repeatedly. SSO improves the user experience by
reducing the need to remember multiple credentials, while simultaneously enhancing security by
centralizing authentication.
SSO works by using a trusted identity provider (IdP) that authenticates the user and issues a token
or session cookie. When the user attempts to access a connected system, the system verifies the
token with the IdP instead of prompting the user to log in again. For example, logging into a
corporate portal might grant access to email, file storage, and project management tools without
requiring separate logins.
While SSO simplifies access, it also requires robust security measures to protect the centralized
authentication process. Multi-factor authentication (MFA) and secure token management are often
used to mitigate risks associated with SSO.

OAuth2: Enabling Token-Based Authorization
OAuth2 is a widely used protocol for token-based authorization, particularly to grant applications
access to APIs or user data without exposing sensitive credentials. OAuth2 operates on the
principle of granting limited, scoped access to resources through short-lived tokens.
The flow begins when a user requests access to a protected resource, such as allowing an app to
view their calendar. The user is redirected to an authorization server, where they authenticate
and grant consent. The server then issues an access token to the app, which can use it to access the
resource securely.
OAuth2 supports different grant types — such as authorization code, implicit, and client
credentials — making it suitable for a variety of contexts, including web, mobile, and server-toserver communication. Its token-based model enhances security by keeping user passwords out of
third-party hands.
OpenID Connect (OIDC) extends OAuth2 by adding an identity layer, allowing applications not just
to access resources, but also to verify the user’s identity. OIDC uses ID tokens in the form of JSON

web tokens (JWTs) to share authenticated user information, such as their name and email. This is
particularly useful when applications need both authentication and authorization.
For example, a website might allow users to log in using a social media account. In this case, the
social media provider serves as the identity provider and issues an ID token for authentication,
alongside an OAuth2 access token for authorized API access.
OIDC’s integration with OAuth2 enables developers to implement secure, standards-based login
systems with minimal complexity.

Security Assertion Markup Language (SAML): Exchanging Authentication Data
Security Assertion Markup Language (SAML) is an XML-based standard for exchanging
authentication and authorization data between parties, typically an identity provider (IdP) and a
service provider (SP). SAML is commonly used in enterprise environments to enable single signon (SSO) across web applications.
In a typical SAML flow, the user initiates access to a service provider, such as a corporate web
application. The service provider redirects the user to an identity provider (IdP), which is
responsible for authenticating the user. Upon successful authentication, the IdP generates a SAML
assertion — a digitally signed XML document — that contains the user’s identity and relevant
attributes. This assertion is returned to the service provider, which validates its authenticity and
grants access based on the information received.
Although SAML offers strong security through digital signatures and encryption, its XML-based
format makes it more heavyweight than newer protocols like OpenID Connect.

Comparison of Authentication Protocols
When deciding which standard to use for identity and access management, it is important to
match the protocol to the application’s requirements:
SSO
is ideal for simplifying user access across multiple internal systems.
OAuth2
excels in API security and delegated access scenarios, allowing users to grant applications
limited access to their data without sharing credentials.
OpenID Connect (OIDC)
builds on OAuth2 to support authentication as well, making it a versatile choice for modern

web and mobile applications.
SAML
remains a strong option for traditional enterprise systems that rely on robust, centralized
authentication.
Ultimately, the right choice depends on the architecture, security needs, and integration goals of
the organization.

How to Manage User Credentials and Use Advanced
Authentication Technologies
Managing user credentials securely is a cornerstone of cybersecurity. Weak or improperly
managed credentials are a leading cause of data breaches and unauthorized access. To address
this challenge, organizations must adopt secure credential management practices and employ
advanced authentication technologies such as two-factor authentication (2FA), multi-factor
authentication (MFA), one-time passwords (OTP), and time-based one-time passwords (TOTP).

Managing User Credentials: Best Practices
Strong password policies are foundational for securing user accounts. Users should be required to
create complex passwords that include a mix of uppercase and lowercase letters, numbers, and
special characters, while avoiding easily guessable phrases or patterns.
However, simply requiring strong passwords is not enough. Secure password storage is equally
important: passwords must never be stored in plain text. Instead, they should be hashed using
secure algorithms like bcrypt, Argon2, or PBKDF2, with a unique “salt” added to each password
before hashing to prevent attacks such as rainbow table lookups.
To further reduce the risk of credential-based attacks, organizations should encourage regular
password rotation, prompting users to update their credentials periodically. In addition, locking a
visitor out of the site after a defined number of failed login attempts can help prevent brute-force
attacks by slowing down or blocking repeated guesses.
But while these techniques form a strong baseline, they are often not sufficient. The technologies
in the following sections supplement passwords with other powerful authentication technologies.

Two-Factor Authentication (2FA): Adding an Extra Layer of Security
Two-factor authentication (2FA) requires users to provide two forms of verification to gain access
to a system. Typically, this involves something the user knows (e.g., a password) and something

the user has (e.g., a one-time password generated by a device).
Typically, 2FA works as follows: A user enters their username and password. The system sends
the user a code through a separate channel (SMS, email, or an authenticator app). The site also
prompts the user to enter the code. Only after providing both pieces of information does the user
get the desired access.
2FA significantly reduces the risk of unauthorized access, even if a user’s password is
compromised. An attacker would need to steal both a password and a physical device to bypass
2FA, which is far less likely than compromising a single factor. However, reliance on SMS-based
codes can introduce vulnerabilities, such as SIM swapping attacks, so more secure methods such
as authenticator apps are recommended.

Multi-Factor Authentication (MFA): Extending 2FA
Multi-factor authentication (MFA) builds on 2FA by requiring multiple independent factors for
authentication. These factors typically fall into three categories:
Something you know
Passwords, PINs, or security questions.
Something you have
Physical devices such as smartphones, hardware tokens, or smart cards.
Something you are
Biometric data such as fingerprints, facial recognition, or voice patterns.
Relying on multile factors provides a higher level of security, making it significantly harder for
attackers to compromise all required elements.

One-Time Passwords (OTP): Secure, Single-Use Codes
One-time passwords (OTP) are passwords valid for a single login session or transaction. Unlike
traditional passwords, OTPs cannot be reused, making them highly resistant to replay attacks.
OTPs are commonly used in conjunction with 2FA or MFA to verify user identity.
OTPs can be delivered through various methods such as SMS or email (the server sends a code
directly to the user’s phone or email address), or authenticator applications (tools such as Google
Authenticator or Microsoft Authenticator generate OTPs locally on the user’s device).
While SMS-based OTPs are convenient, they are vulnerable to interception. Authenticator apps
are a more secure alternative, as they do not rely on external communication channels.

Time-Based One-Time Passwords (TOTP): Synchronized Security
Time-based one-time passwords (TOTP) are a specific type of OTP generated based on the current
time and a shared secret key. TOTP ensures synchronization between the user’s device and the
authentication server, because both use the same algorithm and secret to generate codes.
A shared secret key is generated when the user sets up 2FA or MFA. The authenticator app uses
the secret key and the current time to calculate a code. The server performs the same calculation
and compares the result with the code provided by the user. If the codes match, authentication is
successful.
TOTP is widely regarded as one of the most secure methods for generating OTPs, because it
eliminates the risks associated with SMS-based delivery and ensures that codes are valid for only
a short period (typically 30 seconds).

Authenticator Applications: Generating TOTPs Locally
Authenticator applications, such as Google Authenticator, Microsoft Authenticator, and Authy,
generate TOTPs locally on a user’s device. These apps do not require an internet connection,
making them resilient to network-based attacks. Additionally, since the shared secret key is stored
securely on the device, authenticator apps are immune to the vulnerability of code interception,
unlike SMS-based OTPs.
Setting up an authenticator app is a straightforward yet powerful way to enhance account
security using two-factor authentication (2FA). The process usually begins by a service presenting
a QR code during the 2FA setup phase. The user scans this QR code using the authenticator app,
which stores a shared secret securely on the device.
Once configured, the app continuously generates a six-digit or eight-digit code based on the timebased one-time password (TOTP) algorithm, changing the code every 30 seconds. During future
login attempts, after providing their password, the user is prompted to enter the current code
from the app. Because the codes are time-sensitive and not transmitted over the network,
authenticator apps provide a strong second layer of protection against unauthorized access. Their
broad compatibility with a wide range of services, including email, social media, cloud platforms,
and development tools, makes them a widely adopted and secure option for implementing 2FA.

## 1. During the TLS handshake, what three main steps are performed to establish a secure
connection?

2. How does OpenID Connect (OIDC) extend the OAuth2 framework?

3. What is the function of root CAs and intermediate CAs in the public key infrastructure (PKI)?

4. What essential components must an X.509 certificate contain?

## 5. Why is TOTP-based two-factor authentication considered more secure than SMS-based codes?

## 1. You are setting up a secure website and plan to use HTTPS. You decide to generate a self-signed
X.509 certificate instead of getting one from a trusted CA. What problems might users face
when visiting your site, and how can you resolve them?

## 2. You are inspecting a TLS connection and notice that the X.509 certificate presented by the
server is missing the common name (CN) or subject alternative name (SAN) that matches the
domain you are connecting to. What could be the result of this mismatch?

This lesson explored the foundational concepts behind secure digital communication and identity
verification. It explained how asymmetric cryptography and X.509 digital certificates ensure
confidentiality, integrity, and authenticity, forming the backbone of protocols such as TLS. It
explained how CAs establish a chain of trust and how TLS secures data in transit using a hybrid
encryption model. The lesson also introduced modern authentication and authorization standards
such as OAuth2, OpenID Connect (OIDC), and SAML, highlighting their roles in securing API
access, enabling single sign-on (SSO), and verifying user identities. Finally, it covered best
practices for managing user credentials and advanced authentication technologies including 2FA,
MFA, and OTP, helping to build a secure and resilient access management strategy.

## 1. During the TLS handshake, what three main steps are performed to establish a secure
connection?
The secure communication process begins when the server presents its X.509 certificate to the
client. This certificate contains the server’s public key and is signed by a trusted CA. The client
then verifies the authenticity of the certificate using the CA’s public key, thus ensuring that the
server is legitimate and the communication can be trusted. Once the certificate is validated, the
client and server use asymmetric encryption to securely exchange a symmetric session key,
which encrypts all subsequent data transmitted between them.
2. How does OpenID Connect (OIDC) extend the OAuth2 framework?
OIDC adds an identity layer to OAuth2 by issuing ID tokens that provide user identity
information, enabling authentication in addition to OAuth2’s authorization capabilities.
3. What is the function of root CAs and intermediate CAs in the public key infrastructure (PKI)?
Root CAs are highly trusted and form the top of the trust chain, but rarely issue certificates
directly. Intermediate CAs are delegated by root CAs to issue certificates to end entities,
establishing a chain of trust.
4. What essential components must an X.509 certificate contain?
An X.509 certificate must contain several essential components to function properly in secure
communications. These include the subject’s public key, which will be used for encryption or
signature verification, and the subject’s identity information, such as the domain name or
organization name. The certificate must also include the issuer’s digital signature, which is
created using the CA’s private key and allows clients to verify the certificate’s authenticity
using the CA’s public key. Additionally, the certificate contains a serial number, validity period
(start and expiration dates), and information about the algorithms used. These elements
together ensure trust, integrity, and secure identification of the certificate holder.
5. Why is TOTP-based two-factor authentication considered more secure than SMS-based codes?
TOTP codes are generated locally on the user’s device and are not transmitted over a network,
making them less susceptible to interception or SIM swapping attacks than SMS-based codes.

## 1. You are setting up a secure website and plan to use HTTPS. You decide to generate a self-signed
X.509 certificate instead of getting one from a trusted CA. What problems might users face
when visiting your site, and how can you resolve them?
If you use a self-signed certificate, most browsers will display a warning indicating that the
connection is not secure because the certificate is not issued by a trusted CA. Users will have to
manually accept the risk and bypass the warning, which can harm your site’s credibility and
discourage visitors. To resolve this, you should obtain a certificate from a trusted CA whose
root certificate is pre-installed in major browsers and operating systems. This ensures that
users see a valid, trusted connection without warnings.
2. You are inspecting a TLS connection and notice that the X.509 certificate presented by the
server is missing the common name (CN) or subject alternative name (SAN) that matches the
domain you are connecting to. What could be the result of this mismatch?
If the domain in the certificate doesn’t match the domain the client is connecting to, the client
will treat the certificate as invalid. This mismatch could trigger a browser or application error,
warning the user that the site might not be secure. To avoid this issue, the certificate must
include a common name (CN) or a subject alternative name (SAN) that exactly matches the
domain being accessed. This allows proper hostname verification and ensures the authenticity
of the server.

DevOps Tools Engineer v2.0, Exam 701, Objective 704.2
- Understand goals of IT operations and service provisioning, including nonfunctional
properties such as availability, latency, responsiveness
- Understand and identify metrics and indicators to monitor and measure the technical
functionality of a service
- Understand and identify metrics and indicators to monitor and measure the logical
functionality of a service
- Understand the concepts of Prometheus, including Exporters, Pushgateway, Alertmanager
and Grafana
- Understand the architecture of Prometheus
- Set up Prometheus and configure file based service discovery
- Monitor containers and microservices using Prometheus
- Use PromQL to retrieve log data
- Aggregate metrics for specific labels
- Aggregate metrics over time
- Awareness of common exporters
- Awareness of application instrumentation

- Awareness of Thanos
- Prometheus, Exporters, AlertManager, Grafana
- Label selectors
- Instant vectors and aggregate functions
- Range vectors and aggregate functions
- Node Exporter and Blackbox Exporter

IT operations are not just about keeping systems running — they are vital to the success,
reputation, and competitiveness of any organization. Whether it is an e-commerce platform, a
financial service, a healthcare system, or an educational application, users expect services to be
fast, available, and reliable at all times. A single delay, failure, or security lapse can lead to lost
revenue, damaged trust, and missed opportunities.
This lesson focuses on the key goals of IT operations, especially the requirements of availability,
latency, and responsiveness that go beyond basic functionality. Understanding and monitoring
these metrics is essential in order to anticipate and prevent problems, scale efficiently, and align
technical performance with business goals. By mastering these principles, IT professionals can
ensure that technology truly supports the mission of the organization — serving users with speed,
reliability, and confidence.

IT Operational Goals and Service Monitoring
IT operations play a pivotal role in ensuring that services are delivered reliably and efficiently to
meet both business and user expectations. The following properties are essential for delivering a

seamless user experience, maintaining customer trust, and supporting business continuity.

Availability
Availability refers to a service or system remaining accessible and fully operational over a given
period of time. It is one of the most critical indicators of system reliability and user satisfaction,
especially for services that support business-critical operations. If users cannot reach a service
when they need it — whether due to hardware failure, network disruption, or software
crashes — the credibility and effectiveness of the entire system is compromised.
High availability (HA) means designing systems to minimize downtime and maximize uptime,
even in the face of failures, unexpected load spikes, or infrastructure issues. This is essential not
only for maintaining uninterrupted service delivery, but also for fulfilling service level agreements
(SLAs) and maintaining business continuity.
Redundancy is foundational to high availability. It involves deploying multiple, identical instances
of critical components — such as application servers, databases, load balancers, and storage
systems — so that if one instance fails, another can immediately take over. This architecture
eliminates single points of failure, which are among the most common causes of service outages.
Failover mechanisms complement redundancy by automatically detecting failures and rerouting
traffic or restarting services without human intervention. This ensures that users might not even
notice when a failure occurs, as the system remains responsive and operational.
Proactive monitoring is another crucial element of good performance. By continuously observing
the health and performance of systems, using tools such as Prometheus, IT teams can detect
anomalies early and resolve them before they affect users. Proactive monitoring enables rapid
incident response and supports predictive maintenance, further enhancing uptime.
To prepare for catastrophic events, organizations must also develop and regularly test disaster
recovery (DR) plans. These plans outline procedures for restoring services following major
disruptions, such as data center failures, cyberattacks, or natural disasters. A well-designed DR
plan includes offsite backups, secondary data centers, and automated restoration tools to
minimize recovery time and data loss.
Availability is commonly expressed as a percentage of uptime, for example:
- 99.9% availability allows about 8.76 hours of downtime per year.
- 99.99% availability reduces this to about 52 minutes per year.
- 99.999% availability known as “five nines,” translates to just over 5 minutes of downtime per
year.

Reaching these levels often requires not just technical measures, but also cultural and operational
maturity. The organizational requirements include well-trained personnel, clear escalation
procedures, and a commitment to continuous improvement. In environments where every second
of downtime can mean lost revenue or customer trust, availability is not just a metric — it is a
mission-critical priority.

Latency
Latency is the amount of time it takes for a system to process a request and return a response. It is
one of the most critical performance metrics in IT operations because it directly affects how fast
and responsive a service feels to end users. Whether a visitor is loading a webpage, streaming a
video, interacting with a mobile app, or placing a trade on a financial platform, low latency is
essential for delivering a smooth and seamless user experience.
Several key factors influence latency, each contributing to potential delays if not properly
optimized. One of the most prominent factors is network performance, which includes issues like
network congestion, the physical distance between client and server, and inefficient routing
paths. For instance, a user in Brazil accessing a service hosted in Singapore may experience longer
latency simply due to the distance the data has to travel. Network latency can be further
exacerbated by outdated infrastructure, misconfigured routing, or overloaded links between data
centers.
In addition to network-related delays, server-side processing time is another major contributor to
latency. This is the time it takes for the server to interpret the request, run any business logic,
access data sources, and generate a response. Slow latency can occur when servers are
overloaded, when the application code is not optimized, or when third-party APIs are slow to
respond. Complex microservices architectures can also introduce additional latency, if services
depend heavily on one another in a serial chain.
Another important component is storage access latency. This refers to the delay experienced while
reading from or writing to storage systems such as databases, file systems, or object stores.
Latency in this area can result from slow disk speeds, high query complexity, contention over
shared storage, or inefficient indexing. Applications that perform frequent I/O operations or rely
on large data transfers are particularly sensitive to this type of latency.
To reduce latency and improve responsiveness, organizations adopt a range of infrastructure and
architectural strategies. These include deploying content delivery networks (CDNs) to bring static
content physically closer to users, implementing caching mechanisms at multiple layers (e.g.,
browser cache, reverse proxy cache, database cache), and employing geographically distributed
data centers or edge computing to reduce the distance between the user and the service. On the
back end, techniques such as parallel processing, asynchronous operations, and code optimization

can significantly reduce processing delays.
Ultimately, minimizing latency is not only about raw speed: it is about creating a system that feels
fast, responsive, and reliable, no matter where or how the user connects. In customer-facing
applications, even milliseconds of delay can affect conversion rates, user retention, and overall
satisfaction, making latency a key focus for both developers and IT operations teams.

Responsiveness
Responsiveness reflects how quickly a system reacts to user inputs or events. While related to
latency, responsiveness encompasses the overall user experience, including the efficiency of the
underlying infrastructure and the design of the application itself. Responsiveness can be achieved
through thoughtful application design, efficient resource management, and optimized
Responsiveness is a critical aspect of system performance that directly affects user experience.
Several key factors contribute to how quickly a system responds to user interactions. Latency
plays a central role: systems that respond with minimal delay are perceived as faster and more
efficient. Reducing latency, through optimized network and processing performance, enhances
overall responsiveness.
Another crucial factor is resource allocation. Ensuring that the system has adequate CPU, memory,
and disk resources allows it to process user requests without delays or contention.
In addition, application design significantly determines responsiveness; well-structured code and
streamlined workflows help avoid unnecessary processing steps and eliminate bottlenecks.
Lastly, the user interface (UI) contributes by providing real-time feedback, such as loading
indicators or progress bars. Even if the process takes time, such feedback reassures users that the
system is working, thereby improving the perceived speed and responsiveness of the application.
Responsive systems not only improve user satisfaction but also increase productivity and
engagement, making them a cornerstone of modern IT operations.
Availability, latency, and responsiveness together form the foundation of a reliable and userfriendly service. They ensure that systems are accessible, high-performing, and capable of
meeting user expectations in real time.
For example, an e-commerce platform with high availability allows customers to shop without
interruptions, even during peak traffic periods. A video streaming service with low latency
delivers smooth playback, reducing buffering and improving viewer satisfaction. A responsive
mobile app provides instant feedback, enhancing the user experience and encouraging continued

use.

Metrics for Monitoring Technical Functionality
Ensuring the technical functionality of a service requires continuous monitoring of critical
metrics that reflect the health, capacity, and performance of the underlying infrastructure. These
metrics provide real-time visibility into how services behave under load, reveal potential issues
before they affect users, and guide infrastructure scaling and optimization. Without this visibility,
even minor anomalies can evolve into major service disruptions. Monitoring is therefore not just
a best practice — it is a core pillar of modern IT operations.
By tracking a well-defined set of metrics across compute, memory, storage, and network
resources, organizations can ensure that systems remain efficient, resilient, and responsive, even
as demand fluctuates or failures occur.

CPU Usage
CPU usage measures the percentage of available processor resources currently in use by system
and application processes. It is one of the most immediate indicators of system stress or
inefficiency.
High CPU usage can result from increased user demand, inefficient code, resource contention, or
even a malfunctioning process running in a loop. If sustained, it can lead to sluggish system
response, application crashes, and even infrastructure outages. Conversely, unusually low CPU
usage might indicate that resources are underutilized, which could be a result of overprovisioning
or idle workloads.
Regularly monitoring CPU usage helps IT teams:
- Detect hotspots that require scaling.
- Identify abnormal patterns that suggest performance issues or malicious activity.
- Optimize resource allocation across workloads.
Threshold-based alerts can trigger proactive interventions before the user experience degrades.

Memory Usage
Memory usage tracks the amount of physical RAM being consumed by the system and running
applications. Unlike CPU, which can fluctuate rapidly, memory issues often accumulate over time
and can have long-lasting impacts.

When memory usage is consistently high:
- The system might begin swapping memory to disk (using virtual memory), causing dramatic
performance degradation.
- Applications might face out-of-memory (OOM) errors and terminate unexpectedly.
- Garbage-collected languages (such as Java or Python) may suffer from frequent pauses due to
memory cleanup cycles.
Monitoring memory usage enables teams to:
- Detect memory leaks in long-running applications.
- Set proper memory limits and requests in containerized environments.
- Validate that autoscaling rules react appropriately to memory-intensive workloads.

Disk I/O
Disk I/O (input/output) measures how often and how quickly a system can read from or write to
storage devices. It is a critical metric for understanding the performance of databases, logging
systems, and any applications that depend on frequent data access.
Slow disk I/O can be caused by:
- Hardware bottlenecks (e.g., slow HDDs or saturated SSDs)
- Inefficient database queries or poor indexing
- Storage misconfiguration or excessive logging
High disk I/O can lead to slow API responses, application timeouts, or unacceptable transaction
delays. Monitoring disk I/O allows teams to:
- Detect storage constraints before they cause service degradation.
- Pinpoint workloads with abnormal read/write patterns.
- Optimize database queries and caching strategies.

Network Traffic
Network traffic monitoring provides insights into the volume, type, and direction of data flowing
across services, users, and external systems. It helps IT teams evaluate latency, bandwidth usage,
and packet-level behavior.

Key aspects include:
- Inbound/outbound throughput detects whether a system is receiving or transmitting data too
slowly.
- Packet loss and retransmissions identify underlying connectivity issues.
- Latency spikes reveal routing inefficiencies or overloaded links.
Monitoring this data ensures efficient communication between services and helps detect:
- DDoS attacks or data exfiltration attempts.
- Service misconfigurations, such as unintentional open ports or faulty ingress rules.
- Traffic spikes caused by increased user demand or batch jobs.

Tools for Monitoring
Modern IT environments require automated, scalable, and flexible tools to collect and visualize
technical metrics. Among the most widely adopted solutions are Prometheus and Grafana, open
source tools that work together to provide easy-to-read dashboards and charts about system
Prometheus is a monitoring toolkit for time-series data. It collects metrics from targets via pull or
push models and supports custom queries (through a special language called PromQL), alerting
rules, and integration with Kubernetes.
Grafana is a powerful visualization platform that works seamlessly with Prometheus. It allows IT
teams to create interactive dashboards, set up real-time alerts, and share metrics across teams.
Together, Prometheus and Grafana form a robust foundation for observability, allowing teams to
move from reactive troubleshooting to proactive optimization.

Metrics for Monitoring Logical Functionality
While technical metrics provide insights into the health of infrastructure and systems, logical
functionality should also be monitored to ensure that a service fulfills its intended purpose
effectively. Logical functionality focuses on how well a service aligns with business objectives and
user expectations. By tracking indicators such as error rates, transaction success rates,
uptime/downtime, and user experience, organizations can identify issues that might not be
revealed by purely technical data. This holistic approach ensures that services not only operate
efficiently but also deliver value to end users.

Error Rate
One critical indicator of logical functionality is error rates, which measure the frequency of errors
encountered during service execution. For example, an e-commerce platform with frequent
checkout errors risks losing customer trust and revenue.
High error rates can indicate underlying problems in application logic, integration points, or
external dependencies. Monitoring error rates allows teams to pinpoint problematic areas,
prioritize fixes, and ensure smoother operations.

Transaction Success Rate
Another key metric is the transaction success rate, which tracks the percentage of successful
transactions compared to total attempts. This is particularly important for services whose
functionality relies on completing user actions, such as processing payments, submitting forms, or
executing API calls. A low transaction success rate can signal inefficiencies or failures in the
system’s ability to handle user requests. By analyzing this metric, organizations can identify
patterns, optimize workflows, and improve the overall reliability of their services.

Uptime and Downtime
Uptime and downtime are also essential indicators of logical functionality. Uptime measures the
duration during which a service remains available, while downtime tracks periods of
unavailability or outages. These metrics have a direct impact on user satisfaction and business
continuity. For instance, even if a system performs well technically, prolonged downtime can lead
to lost opportunities, damaged reputations, and financial losses.
Tracking uptime and downtime helps teams evaluate service reliability and implement strategies
to minimize disruptions, such as redundancy and failover mechanisms.

User Experience
User experience metrics provide valuable insights into how end users perceive and interact with a
service. Examples include page load times, API response times, and other measures that directly
affect usability.
Slow load times or delayed responses can frustrate users, leading to higher bounce rates or
abandoned transactions. By monitoring these metrics, organizations can ensure that their services
are not only functional but also intuitive and responsive, fostering positive user experiences.

Bridging Technical and Logical Metrics
Monitoring these logical functionality indicators complements technical metrics by addressing the
broader context of service performance. While technical metrics focus on the “how” of system
operation, logical metrics emphasize the “why” and “what” — ensuring that services meet
business goals and user needs.
Together, these metrics create a comprehensive view of service health, enabling organizations to
address issues proactively, optimize performance, and deliver services that align with both
operational and strategic objectives.

## 1. What does “high availability” mean in the context of IT operations, and which strategies are
typically used to achieve it?

2. List and briefly explain three key factors that influence latency in a system.
