---
id: lpi-701-200-05
title: "LPIC-1 · 701-200 — Explain the purpose of the Kubernetes API Server in the control…"
slug: lpi-701-200-05-lpic-1-701-200-explain-the-purpose-of-the-kubernetes-api-ser
source: "LPI Learning Material — LPIC-1 (Exam 701-200)"
sourceSection: "1. Explain the purpose of the Kubernetes API Server in the control plane. Why is it considered the, 4. Describe the responsibilities of the kubelet. How does it interact with the rest of the Kubernetes, 1. Imagine you are managing a Kubernetes cluster, and you notice that one of your applications, 1"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "Kubernetes is the leading platform for orchestrating containerized applications. Covers 32 sections: Explain the purpose of the Kubernetes API Server in the control plane. Why is it considered the, Describe the responsibi."
---
# LPIC-1 · 701-200 — Explain the purpose of the Kubernetes API Server in the control…

## 4. Describe the responsibilities of the kubelet. How does it interact with the rest of the Kubernetes
system?

5. Define a Kubernetes pod and explain what resources are shared between its containers.

## 1. Imagine you are managing a Kubernetes cluster, and you notice that one of your applications
becomes unavailable after a node unexpectedly crashes. Describe how Kubernetes is designed
to handle this situation, and which components are responsible for maintaining the
application’s availability. Would any manual action be required?

Kubernetes is the leading platform for orchestrating containerized applications. It provides
developers and operators with powerful tools to deploy, scale, and manage software efficiently
across distributed systems. Originally created by Google and now maintained by the Cloud Native
Computing Foundation (CNCF), Kubernetes has evolved into a robust, open source ecosystem used
across many industries. This lesson explored the major components of a Kubernetes cluster,
including the control plane and worker nodes, and offered a foundation for understanding how
Kubernetes maintains the desired state of applications at scale.
The lesson also covered essential services such as the API server, scheduler, controller manager,
and etcd, which coordinate application workloads and ensure high availability and fault
tolerance. On the worker side, the lesson explained the roles of the kubelet, kube-proxy, and
container runtime. Kubernetes abstractions such as pods and services were introduced.

## 1. Explain the purpose of the Kubernetes API Server in the control plane. Why is it considered the
“front door” of the cluster?
The API Server acts as the central communication hub for all components in the Kubernetes
cluster. It exposes the Kubernetes API and handles all requests to create, update, delete, or read
cluster resources. It also enforces security through authentication, authorization, and
admission control. Because all interactions with the cluster go through it — including
commands from kubectl — it is often called the “front door” of the cluster.
2. What kind of data does etcd store, and why is it critical for cluster reliability?
etcd stores all the persistent state data of the Kubernetes cluster, including node information,
pod configurations, secrets, and service definitions. It is a distributed key-value store that
ensures data consistency using the Raft consensus algorithm. Because all cluster state is saved
in etcd, its availability and integrity are critical. If etcd is lost or corrupted, the cluster may stop
functioning correctly.
3. What are some factors the scheduler considers when assigning a pod to a node?
The scheduler evaluates nodes based on several criteria: available CPU and memory, node
taints and tolerations, affinity or anti-affinity rules, and custom constraints. It scores all eligible
nodes and assigns the pod to the one that best satisfies the cluster’s scheduling policies and
resource needs. The goal is to balance workloads and ensure optimal resource utilization.
4. Describe the responsibilities of the kubelet. How does it interact with the rest of the Kubernetes
system?
The kubelet is an agent that runs on every worker node. It communicates with the API Server
to get instructions about which pods to run. It then uses the container runtime to create and
manage those containers. The kubelet also monitors the health of the containers and reports
their status back to the control plane.
5. Define a Kubernetes pod and explain what resources are shared between its containers.
A pod is the smallest deployable unit in Kubernetes. It can contain one or more containers that
need to run together. Containers in the same pod share the same network namespace
(including IP address and ports), shared storage volumes, inter-process communication (IPC),
and optionally the same PID namespace. This allows them to collaborate closely, like
components of a single application.

## 1. Imagine you are managing a Kubernetes cluster, and you notice that one of your applications
becomes unavailable after a node unexpectedly crashes. Describe how Kubernetes is designed
to handle this situation, and which components are responsible for maintaining the
application’s availability. Would any manual action be required?
In Kubernetes, the node controller detects when a node fails to send heartbeats and marks it as
NotReady. After a grace period, it considers the node unreachable and evicts the pods that
were running on it. The scheduler then looks for new nodes with enough resources and
reschedules the pods on those nodes. The replication controller or deployment ensures that the
desired number of pod replicas are running, so that, if a pod is lost due to node failure, a new
one will be created automatically. This design allows Kubernetes to self-heal and maintain
application availability without requiring manual intervention in most cases.

### 703.1 Kubernetes Architecture and Usage

This lesson shows how to interact with a Kubernetes cluster using kubectl, the powerful
command-line tool that serves as the primary interface to Kubernetes. The lesson starts with
querying and inspecting various Kubernetes resources, offering a clear view of what is running in
the cluster and how it is behaving. From there, the lesson moves on to creating, updating, and
deleting resources. When examples are run in a local Minikube environment, the lesson provides
hands-on experience with the key commands needed to manage workloads, services, and

Introducing kubectl
kubectl is the command-line interface (CLI) that conveys administrator and developer
commands to the Kubernetes API server. It provides a unified syntax for issuing HTTP requests to
the API, enabling users to perform declarative and imperative operations on cluster resources.
Through kubectl, administrators and developers can manage the full lifecycle of Kubernetes
objects — such as pods, deployments, services, ConfigMaps, and more — using YAML manifests or
direct commands.

kubectl also supports advanced functions such as label and field selectors, a choice of output
formats, and resource patching, making it a critical tool for low-level interaction and automation
in Kubernetes environments.

The kubeconfig File
Kubernetes uses a configuration file, commonly referred to as the kubeconfig file, to store
information about clusters, users, and contexts. By default, this file is located at ~/.kube/config.
It contains the following high-level elements:
clusters
Information about the API server endpoint (e.g., IP address or DNS name) and certificate
details.
users
Authentication details such as client certificates, tokens, or username/password combinations.
contexts
A combination of a cluster, a user, and an optional namespace, that together define how
kubectl interacts with the cluster.
Developers with access to an existing Kubernetes cluster might find that someone has already
provided a kubeconfig file. Otherwise, one should be created from scratch.

Context in Kubernetes
A context in Kubernetes is a configuration element within the kubeconfig file that defines access
parameters for a specific cluster, including the cluster, the user, and optionally the namespace
to be used by kubectl. Contexts allow users to quickly switch between multiple Kubernetes
environments, such as development, staging, and production, without modifying the underlying
connection details.
Each context is identified by a name and is composed of three main components:
cluster
The Kubernetes cluster to communicate with.
user
The credentials used for authentication.

namespace (optional)
The default namespace for kubectl commands.
The active context determines which cluster and user kubectl interacts with when executing
each command.
Understanding and effectively using kubectl commands is essential for managing Kubernetes
clusters. A detailed explanation follows of each command, including practical examples to
demonstrate their use in real-world scenarios.

Starting a Single Pod: kubectl run
The kubectl run command is a quick way to create and run a single-instance pod. It is often
used for testing or debugging. For example, to run an Nginx pod:
$ kubectl run nginx-pod --image=nginx
pod/nginx created

To specify additional options, such as environment variables, resource limits, or commands to
execute inside the container, enter:
$ kubectl run busybox --image=busybox --command -- sleep 3600
pod/busybox created

Retrieving Resource Information: kubectl get
The kubectl get command retrieves basic information about Kubernetes resources in a cluster.
It returns concise status details such as name, readiness, age, and current state. This command is
typically used for monitoring or scripting.
To get a list of nodes, enter:
$ kubectl get nodes

ROLES

VERSION

Ready

control-plane

145m

v1.32.0

The output in the previous example shows the format used by default to display different fields,
known as tabular format. Other formats, such as JSON, are also available. These are useful for
feeding output to other tools that process the formats.

To list all pods in the default namespace, enter:
$ kubectl get pods

busybox

31m

nginx-pod

9s

To display additional details, such as pod IP addresses and node assignments, use the -o wide
option:
$ kubectl get pods -o wide

IP

NODE

NOMINATED NODE

47s

10.244.0.4

nginx-pod 1/1

68s

10.244.0.3

READINESS GATES
busybox

To retrieve resources from a specific namespace, enter:
$ kubectl get pods -n kube-system

coredns-668d6bf9bc-stbck

etcd-minikube

kube-apiserver-minikube

kube-controller-manager-minikube

kube-proxy-n4tn5

kube-scheduler-minikube

storage-provisioner

1 (145m ago)

The kube-system namespace hosts critical system components and control plane pods managed
by Kubernetes, such as the kube-apiserver, kube-controller-manager, kube-scheduler,
etcd, and coredns.
To see all namespaces, use the --all-namespaces options:
$ kubectl get pods --all-namespaces

To list a single replication controller with a specified name, enter:
$ kubectl get replicationcontroller <replication-controller-name>

To list all deployments, enter:
$ kubectl get deployments --all-namespaces
NAMESPACE

AVAILABLE

15m

kube-system coredns 1/1

UP-TO-DATE

To list a single pod in JSON output format:
$ kubectl get pod nginx-pod -o json
"apiVersion": "v1",
"kind": "Pod",
"metadata": {
"creationTimestamp": "2025-10-23T15:07:07Z",
"generation": 1,
"labels": {
"run": "nginx-pod"
},
"name": "nginx-pod",
"namespace": "default",

To list all replication controllers and services together in tabular format, enter:
$ kubectl get rc,services

service/kubernetes

151m

Detailed Resource Inspection: kubectl describe
The kubectl describe command provides a detailed view of a specific resource, including its
configuration, status, and events. This is particularly useful for troubleshooting. For instance, to
inspect a pod named nginx-pod, enter:
$ kubectl describe pod nginx-pod

The output includes information such as container specifications, the assigned node, conditions,
and recent events. Other resources, such as services or nodes, can also be described:

$ kubectl describe service nginx-service
$ kubectl describe node minikube

Declarative Resource Management: kubectl apply
The kubectl apply command creates or updates resources declaratively by applying a YAML or
JSON manifest file. This is a key feature of GitOps workflows.
For example, to deploy an application using a manifest file named deployment.yaml, enter:
$ kubectl apply -f deployment.yaml

The previous command makes any necessary changes to bring the cluster into conformance with
in a configuration file named deployment.yaml, written in YAML. An example of a configuration
file for running Nginx follows:
replicas: 2

If the resource already exists, apply updates it to match the desired state defined in the manifest.
The use of configuration files allows administrators to define the desired state of a resource and
let Kubernetes reconcile the actual state to match it. This is the preferred method for managing

resources in production environments because it supports idempotency, version control, and
GitOps workflows. If the resource already exists, Kubernetes performs a three-way merge and
applies only the changes, preserving unmanaged fields.
To delete resources defined in the manifest, use the --prune option or manually delete them:
$ kubectl delete -f deployment.yaml

Imperative Resource Creation: kubectl create
The kubectl create command creates resources imperatively, either directly via the command
line or from a manifest file. For example, to create a new namespace called test-namespace,
enter:
$ kubectl create namespace test-namespace

The kubectl create command can be used to explicitly create a new resource, such as a
deployment:
$ kubectl create deployment nginx --image=nginx

To create reseources from a manifest file, enter:
$ kubectl create -f deployment.yaml

Unlike apply, the create command does not update existing resources. If the resource already
exists, the command fails — unless you use the --dry-run=client option.
This option simulates the creation process locally: it validates and shows what would happen,
without actually sending any change to the cluster.
Resources can be modified in several ways using kubectl.
To an updated manifest (a declarative update), enter:
$ kubectl apply -f updated-deployment.yaml

To “patch” specific fields using the imperative form, enter:

$ kubectl patch deployment nginx --type=merge -p '{"spec":{"replicas":4}}'

Resources can be deleted using either their name:
$ kubectl delete pod nginx-pod

or a manifest file:
$ kubectl delete -f nginx-deployment.yaml

Creating a Service: kubectl expose
The kubectl expose command creates a service to expose a deployment, replica set, or pod to
external traffic. For example, to expose the web HTTP port of a pod named nginx-pod on port
8080, enter:
$ kubectl expose pod nginx-pod --port=80 --target-port=8080 --name nginx-service
service/nginx-service exposed

This command creates a service that maps the pod nginx 80 port to an 8080 port, making it
accessible externally.
To verify the service details using kubectl get service:
$ kubectl get services

kubernetes

155m

nginx-service

10.101.41.66

80/TCP

53s

Changing Replica Count: kubectl scale
The kubectl scale command adjusts the number of replicas in a deployment, replica set, or
stateful set. For example, to scale a deployment named nginx-deployment to five replicas, enter:
$ kubectl scale pod nginx-deployment --replicas=5

This command dynamically increases or decreases the number of running pods, enabling
horizontal scaling based on workload demands.

Updating Resource Fields: kubectl set
The kubectl set command modifies specific attributes of a resource without editing the entire
manifest. For example, to update the image of a container in a deployment, enter:
$ kubectl set image deployment/nginx-deployment nginx=nginx:1.21

This command updates the container image to version 1.21 without requiring a full redeployment.
kubectl set can also configure environment variables, resource limits, or other properties.

Editing Live Resource Definitions: kubectl edit
The kubectl edit command opens the live configuration of a resource in the default text editor,
allowing to make changes interactively. For example, to edit a deployment named nginxdeployment, enter:
$ kubectl edit deployment nginx-deployment

After the changes are saved, Kubernetes applies the updated configuration immediately. This is
useful for making quick adjustments without the need for a separate manifest file.

Viewing Resource Schema: kubectl explain
The kubectl explain command provides detailed documentation about the structure and fields
of a Kubernetes resource. For example, to view the schema of a deployment, enter:
$ kubectl explain deployment

To drill down into specific fields to understand their purposes and valid values, enter something
such as:
$ kubectl explain deployment.spec.template.spec.containers

This command is invaluable for understanding the required and optional fields when writing
manifests.

Managing the kubeconfig File: kubectl config
The kubectl config command manages kubeconfig files, which store cluster, user, and context
information. For example, to view the current configuration, enter:
$ kubectl config view

To get the current context, enter:
$ kubectl config get-contexts

CLUSTER

AUTHINFO

NAMESPACE

*

default

To change the context:
$ kubectl config use-context <context-name>
$ kubectl config set-context --current --namespace=<namespace>

This command is essential for working with multiple clusters or namespaces.

Viewing Pod Logs: kubectl logs
The kubectl logs command retrieves logs from a specific pod or container. For example, to
view the logs of a pod named nginx-pod, enter:
$ kubectl logs nginx-pod

It is also possible to stream logs in real-time using the -f option:
$ kubectl logs nginx-pod -f

Running Commands Inside a Container: kubectl exec
The kubectl exec command executes commands inside a running container. For example, to
start an interactive shell in a pod named busybox, enter:
$ kubectl exec -it busybox -- /bin/sh

To run non-interactive commands, such as listing files in a directory, omit the -it options:
$ kubectl exec busybox -- ls /etc
group
hostname
passwd
shadow

This command is widely used for debugging and interacting with the applications running in
containers.

Configuring kubectl to Use an Existing Kubernetes Cluster
To configure kubectl to use an existing Kubernetes cluster, the cluster needs a kubeconfig file.
Once the kubeconfig file has bee created, follow these steps to configure kubectl.

Place the kubeconfig File in the Default Location
By default, kubectl looks for the kubeconfig file at ~/.kube/config. If the kubeconfig file is
named differently or located elsewhere, either rename and move it to the default location, or
specify its path explicitly.
$ mkdir -p ~/.kube
$ cp /path/to/your/kubeconfig ~/.kube/config

Verify the Configuration
After setting up the kubeconfig file, verify that kubectl is correctly configured:
$ kubectl config view

This command displays the current kubeconfig settings, including clusters, users, and contexts.

Test Connectivity to the Cluster
To ensure that kubectl is properly connected to the cluster, run the following commands:

$ kubectl cluster-info
$ kubectl get nodes

The output should display the API server endpoint and other cluster details.

Kubernetes Operators
A Kubernetes operator is a method of packaging, deploying, and managing a Kubernetes
application using custom controllers. An operator extends the Kubernetes API by defining a
custom resource definition (CRD) and implementing logic to manage the full lifecycle of complex,
stateful applications.
While standard Kubernetes resources (like deployments and stateful sets) handle stateless
applications well, operators automate tasks such as installation, upgrades, backups, scaling, and
failure recovery of stateful or complex applications (e.g., databases, message brokers, etc.).
Operators are essentially controllers written in Go (or other languages using client libraries) that
watch for changes to custom resources and act accordingly. They encapsulate domain-specific
knowledge of how to operate a particular application.
For example, a PostgreSQL Operator might:
- Deploy a database cluster.
- Monitor the cluster’s health and automatically replace failed nodes.
- Perform automated backups and restores.
- Handle version upgrades with zero downtime.
Operators bring automation, consistency, and reliability to managing complex applications in
Kubernetes environments. They align with the Kubernetes philosophy of declarative
configuration and reconcile loops.
Real-world examples include:
Prometheus operator
Manages Prometheus monitoring stacks.
Elastic Cloud on Kubernetes (ECK) operator
Automates the ElasticSearch lifecycle.

MariaDB/Galera operator
Manages highly available database clusters.

## 1. Using kubectl run, create a simple Nginx pod called nginx-pod and a temporary pod named
busybox that sleeps for one hour.

2. List all pods running in the default namespace, showing detailed node and IP info.

3. Describe the nginx-pod to see detailed configuration and events.

4. Stream logs from the nginx-pod pod in real time.

## 5. Execute an interactive shell inside the busybox pod.

1. An Ingress is an API object that defines rules allowing external access to services in a cluster.
Enable the Ingress controller in Minikube using the minikube addons enable ingress
command.
Now deploy a “Hello World” app using the gcr.io/google-samples/hello-app:1.0 image
in a deployment called web. After that, expose the deployment using the NodePort type to port
8080. Use the command minikube service web --url to access the app using curl.

This lesson provided a comprehensive introduction to managing Kubernetes clusters using
kubectl, the command-line interface for interacting with the Kubernetes API server. The lesson
showed how to configure access to a cluster using the kubeconfig file and how to switch between
multiple contexts for different environments. Through practical examples, the lesson provided
guidance in creating, inspecting, and managing Kubernetes resources such as pods, deployments,
and services. It explored both imperative commands like kubectl run and kubectl create,
and declarative management using kubectl apply with YAML manifests.

## 1. Using kubectl run, create a simple Nginx pod called nginx-pod and a temporary pod named
busybox that sleeps for one hour.
$ kubectl run nginx-pod --image=nginx
$ kubectl run busybox --image=busybox --command -- sleep 3600

The first command creates a pod named nginx-pod with the nginx image, and the second
runs a BusyBox container in sleep mode, useful for testing.
2. List all pods running in the default namespace, showing detailed node and IP info.
$ kubectl get pods -o wide

IP

NODE

NOMINATED NODE

97s

10.244.0.21

2m29s

10.244.0.20

READINESS GATES
busybox
nginx-pod

The output displays the pod’s IP address, node, and scheduling information.
3. Describe the nginx-pod to see detailed configuration and events.
$ kubectl describe pod nginx-pod

The output displays container specifications, conditions, and recent events.
4. Stream logs from the nginx-pod pod in real time.
$ kubectl logs -f nginx-pod

This command performs live monitoring on the container logs, which is useful for debugging.
5. Execute an interactive shell inside the busybox pod.
$ kubectl exec -it busybox -- /bin/sh
/ # ls

bin

dev

etc

home

lib

lib64

proc

root

sys

tmp

usr

var

1. An Ingress is an API object that defines rules allowing external access to services in a cluster.
Enable the Ingress controller in Minikube using the minikube addons enable ingress
command.
Now deploy a “Hello World” app using the gcr.io/google-samples/hello-app:1.0 image
in a deployment called web. After that, expose the deployment using the NodePort type to port
8080. Use the command minikube service web --url to access the app using curl.
To activate the Nginx Ingress controller in your cluster, execute the following command:
$ minikube addons enable ingress

Verify that the Nginx Ingress controller is running by checking the pods:
$ kubectl get pods -n ingress-nginx

ingress-nginx-admission-create-swgkr

0/1

Completed

ingress-nginx-admission-patch-pvltk

0/1

Completed

ingress-nginx-controller-56d7c84fd4-qlzlb

To create a deployment named web using the gcr.io/google-samples/hello-app:1.0
image, run the following command:
$ kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0
deployment.apps/web created

Verify that the deployment is in a READY state:
$ *kubectl get deployment web *

UP-TO-DATE

AVAILABLE

web

12m

Now expose the web deployment using --type=NodePort to port 8080:
$ kubectl expose deployment web --type=NodePort --port=8080
service/web exposed

Verify if the web service is exposed:
$ kubectl get service web

web

10.105.62.222

8080:32621/TCP

15m

Use the minikube service command to open the service through its NodePort:
$ minikube service web --url
http://192.168.49.2:32621

Navigate to the URL displayed in the previous output to test the application using curl:
$ curl http://192.168.49.2:32621
Hello, world!
Version: 1.0.0
Hostname: web-75995f7dbf-pbxhf

DevOps Tools Engineer v2.0, Exam 701, Objective 703.2
7
- Understanding the use of YAML files to declare Kubernetes resources
- Understanding the principle of a Pod
- Understanding how to use Deployments, including scaling and rolling updates
- Understanding how to make services accessible using Services and Ingress
- Understanding how to use storage using PersistentVolumeClaims
- Awareness of other Kubernetes orchestration resources, i.e. DaemonSets, StatefulSets, Jobs
and CronJobs
- Pods
- ReplicaSets
- Deployments
- Services
- Ingress
- PersistentVolumeClaims
- ConfigMaps
- Secrets

Kubernetes has emerged as the de facto standard for container orchestration, enabling developers
and operations teams to deploy, manage, and scale applications with unprecedented efficiency. At
its core, Kubernetes operates on a declarative model, where resources such as pods, deployments,
and services are defined using files in YAML format. These files provide a human-readable and
version-controlled way to specify the desired state of applications and infrastructure.

Pods
Central to Kubernetes’s architecture is the concept of a pod, which acts as the basic execution unit
in the ecosystem. A pod represents a single application instance in a cluster, and may include one
or more tightly coupled containers that share the same network namespace, storage, and lifecycle.
A container is a lightweight, portable, and self-sufficient software unit that packages an
application along with its dependencies, libraries, and configuration files.
Containers within a pod share the same network namespace, storage, and lifecycle, making them
ideal for tightly coupled applications (Main elements of a pod).

Figure 6. Main elements of a pod

While pods are ephemeral by nature (they can be created, destroyed, or replaced dynamically),
they form the foundation for higher-level abstractions such as deployments, ReplicaSets, and
StatefulSets.
Containers inside the same Pod share:
Network namespace
All containers in a pod share the same IP address and ports. That means they can talk to each
other over the localhost host name.
Volumes (shared storage)
Containers in a pod can use the same volume. This is useful for exchanging files or keeping
shared logs.
Interprocess communication (IPC)
Containers can communicate with each other in the pod using signals and shared memory. This
simplifies process communication.
PID namespace
In some configurations, containers can see and interact with each other’s process identifiers.
Even though each container runs its own binary, sharing these resources helps the binaries
collaborate closely, especially when they are part of the same application.
Beyond the foundational concept of pods, Kubernetes introduces a variety of abstractions that
streamline application deployment, scalability, and networking.
Kubernetes provides a rich set of tools and resources to address diverse application requirements,
from exposing services to managing storage and scheduling tasks.

Deployments: Pod and ReplicaSet Management
A deployment is a higher-level abstraction that manages a group of pods through a ReplicaSet.
Deployments allow declarative updates for pods and ReplicaSets, meaning that the administrator
or developers describe the desired state (e.g., “I want three replicas of this pod”), and Kubernetes
continuously works to maintain that state.
One of the key advantages of deployments in Kubernetes is support for rolling updates, which
allow developers to release new versions of applications without any downtime. During a rolling
update, Kubernetes gradually replaces old pods with new ones, ensuring that the application
remains available throughout the process.
If something goes wrong during an update, deployments also support rollbacks. This means that
developers can quickly revert to a previous, stable version of the application with a simple
command, minimizing risk and recovery time.
In addition, deployments allow applications to scale up or down easily by adjusting the number of
replicas. To handle a sudden spike in traffic or, in contrast, to reduce resource use during periods
of low demand, scaling can be done dynamically and without interrupting service.
Deployments include self-healing capabilities. If a pod crashes or is accidentally deleted,
Kubernetes automatically detects the issue and creates a new pod to maintain the desired state,
keeping the application resilient and available.
Deployments are ideal for managing stateless applications in production, such as web servers,
APIs, and front-end apps.

Using YAML Files to Declare Kubernetes Resources
Kubernetes resources — pods, deployments, services, ConfigMaps, and more — are defined using
YAML files. This practice enables declarative configuration, which is a cornerstone of
Infrastructure as Code (IaC).
A typical Kubernetes YAML resource contains four fields at the top level (described in the
following sections). The metadata and spec fields contain most of the resource’s specifications,
for example:
name: example-pod
namespace: production

app: myapp
tier: backend
annotations:
prometheus.io/scrape: "true"
prometheus.io/port: "9090"
description: "This pod runs the backend service for myapp and is monitored by
Prometheus"
- name: myapp-container
image: myregistry/myapp:latest
- containerPort: 9090

This file is usually called a manifest in Kubernetes. It defines the desired state of one or more
cluster resources. Each manifest describes how a resource should behave — for example, which
containers a pod should run, how many replicas a deployment should maintain, or which
configuration data a ConfigMap or secret should contain.
A manifest acts as a declarative specification. Instead of issuing imperative commands, the
manifest expresses what the system should look like, and the Kubernetes control plane ensures
that the actual cluster state matches this desired state.

apiVersion: Which Version of the Kubernetes API to Use
Every Kubernetes resource is handled by a specific version of the API. The apiVersion field tells
Kubernetes which version of the API should be used to interpret the resource that the file is
declaring. Example values are:
v1
for basic resources such as pods, services, and ConfigMaps.
apps/v1
for more complex resources such as deployments and StatefulSets.
API versions change as Kubernetes evolves. Using the correct apiVersion ensures compatibility
with the cluster.

kind: What Type of Resource is being Declared
The kind field specifies the type of Kubernetes object the file is defining — in other words, what it

wants created. Common values (note the initial capital letters) include:
Pod
A basic unit that runs one or more containers.
Deployment
Manages pods and ReplicaSets for rolling updates.
Service
Exposes pods to the network.
ConfigMap
Stores configuration data.

metadata: Identifying and Organizing the Resource
The metadata section contains identifiers and organizational information about the resource
being defined in the file. Kubernetes consults the metadata section to track and manage resources
across the cluster. Common fields include:
name
A name for the pod, which must be unique within its namespace.
namespace
Scope for the pod, putting it in a specific logical grouping in the cluster. Namespaces allow
resource isolation and management.
labels
Key-value pairs used for selecting and organizing resources. Controllers such as deployments,
services, and NetworkPolicies rely on labels to target specific pods.
annotations
A powerful and flexible way to attach non-identifying metadata to pods, deployments, services,
Ingresses, and more. Annotations are defined as key-value pairs under the
metadata.annotations field and can hold arbitrary structured or unstructured data for use
by tools, controllers, and external systems. Annotations are not indexed by the Kubernetes API
server, so there is no constraint on storing large or complex values, such as full JSON blobs,
URLs, or configuration data.
An example metadata section follows:

name: my-app
namespace: production
app: frontend
tier: web

spec: Desired State of the Resource
The spec field (short for “specification”) defines the configuration and behavior to be enforced by
Kubernetes. Its structure varies depending on the resource type. For example, the field for a pod
could specify:
- name: my-container
image: nginx

This configuration tells Kubernetes how to create, run, and manage an Nginx container.

How to Use Deployments in Kubernetes
A deployment is one of the most common resources in Kubernetes. It provides a declarative way
to manage pods and ReplicaSets. A deployment defines the desired state of the application,
including how many instances (or replicas) should be running. Kubernetes ensures that this state
is maintained continuously. If any pod fails or is deleted, the deployment automatically replaces it.
This makes deployments a reliable and scalable way to run containerized applications in
production environments.

Defining a Deployment
To create a deployment, write a YAML file that declares the resource. For example, the following
file with the name deployment.yaml runs three replicas of an Nginx container:
replicas: 3

Under spec, the file defines the number of replicas, the selector that matches the pods that the
deployment manages, and the template that describes how the pods should be
created — including the container image, name, and ports.
This YAML file can be used to start a cluster through the following command:
$ kubectl apply -f deployment.yaml
deployment.apps/nginx-deployment created

The command causes Kubernetes to create the appropriate ReplicaSet and pods according to the
specification. View the ReplicaSet by entering:
$ kubectl get replicasets

DESIRED

nginx-deployment-55d67f7b54

16m

Scaling a Deployment
Scaling a deployment means increasing or decreasing the number of replicas running in the
cluster. This can be done manually by editing the replicas field in the YAML file and reapplying
the file.
Alternatively, scaling can be accomplished using the command line with a kubectl scale
deployment command, specifying the new number of replicas:
$ kubectl scale deployment nginx-deployment --replicas=5

deployment.apps/nginx-deployment scaled
$ kubectl get pods

nginx-deployment-55d67f7b54-5qf78

6s

nginx-deployment-55d67f7b54-5tm82

6s

nginx-deployment-55d67f7b54-kbpp6

3m10s

nginx-deployment-55d67f7b54-qbsv6

3m10s

nginx-deployment-55d67f7b54-stjdh

3m10s

The output shows the “old replicas” that were created three minutes ago, and the two “new”
replicas that were created just six seconds ago.
When you scale up, Kubernetes adds new pods; when you scale down, it removes the excess pods
to match the desired replica count.

Performing Rolling Updates
One of the most powerful features of deployments is rolling updates. This allows you to update the
application — for example, to use a new container image — with zero downtime. When you run a
command such as kubectl set image to update the image version, Kubernetes gradually
replaces the “old” Pods with new ones:
$ kubectl set image deployment nginx-deployment nginx=nginx:1.26
deployment.apps/nginx-deployment image updated

This causes Kubernetes to create new pods with the updated image, and gradually replaces old
pods. Kubernetes ensures that some pods always remain available during the process.
The behavior of rolling updates can also be customized using a strategy field in the YAML
configuration. This field can define, for example, how many pods may be unavailable during the
update (maxUnavailable) and how many extra pods can be temporarily created (maxSurge).
These settings help balance availability with the speed of the rollout:
strategy:
type: RollingUpdate
rollingUpdate:
maxUnavailable: 1
maxSurge: 1

Rollbacks and Version History
If something goes wrong during an update, an administrator can roll the cluster back to the
previous working version using the kubectl rollout undo deployment command:
$ kubectl rollout undo deployment nginx-deployment
deployment.apps/nginx-deployment rolled back

It is also possible to view the history of previous rollouts to understand what changes were made:
$ kubectl rollout history deployment nginx-deployment
deployment.apps/nginx-deployment
REVISION

CHANGE-CAUSE

ReplicaSets
A ReplicaSet ensures that a specific number of identical pods are running at all times. If any of the
pods stop working or are deleted, the ReplicaSet automatically creates new ones to maintain the
desired state.
The following ReplicaSet ensures that three Nginx pods are always running. If one pod crashes or
is deleted, the ReplicaSet creates a new one automatically:
kind: ReplicaSet
name: frontend-replicaset
app: frontend
replicas: 3
tier: frontend
tier: frontend

To view existing ReplicaSets, enter:
$ kubectl get replicasets

DESIRED

nginx-deployment-55d67f7b54

16m

nginx-deployment-65dd7588fc

8m21s

In practice, deployments are more commonly used than ReplicaSets because deployments offer
advanced features such as rolling updates and rollbacks.

Managing Application Configuration With ConfigMaps and
Secrets in Kubernetes
Kubernetes encourages applications to be configured separately from container images.
Hardcoding configuration values — such as environment-specific settings or sensitive
credentials — into containers is highly discouraged because it makes them inflexible and insecure.
To avoid this hardcoding, Kubernetes provides two key resources: ConfigMap and secret.

ConfigMaps
A ConfigMap is a key-value store that injects configuration information into applications. The
information can come from files, literal string values, or YAML definitions.
The following file with the name configmap.yaml creates a ConfigMap:
kind: ConfigMap
name: nginx-config
data:
index.html: |
<head><title>Hello from ConfigMap</title></head>
<body>
<h1>This HTML page was loaded from a ConfigMap!</h1>

</body>
</html>

The idea here is to mount the HTML content as a file into the Nginx web root inside the container,
replacing the default index page.
Create the ConfigMap from the file with the command:
$ kubectl apply -f configmap.yaml
configmap/nginx-config created

One way to use this ConfigMap in an Nginx pod is to refer to it in an environment variable. The
following configuration file is named my-pod.yaml:
name: nginx-with-configmap
- name: html-volume
mountPath: /usr/share/nginx/html/index.html
subPath: index.html
- name: html-volume
configMap:
name: nginx-config

Enter the following command to mount the index.html file from the nginx-config ConfigMap
directly into the container at the exact location where Nginx expects it
(/usr/share/nginx/html/index.html):
$ kubectl apply -f my-pod.yaml
pod/nginx-with-configmap created

Access the Nginx server (e.g., via kubectl port-forward or a service) to see the custom HTML
page from the ConfigMap, instead of the default Nginx welcome page. The following command

exposes the pod temporarily:
$ kubectl port-forward pod/nginx-with-configmap 8080:80 &

Now open a browser and visit http://localhost:8080, or use curl to retrieve the web page.
The custom HTML page served from the ConfigMap should be displayed:
$ curl http://localhost:8080
Handling connection for 8080
<head><title>Hello from ConfigMap</title></head>
<body>
<h1>This HTML page was loaded from a ConfigMap!</h1>
</body>
</html>

Secrets
Secrets typically store credentials needed by the system to interact with external services on
behalf of the user. The secrets can be mounted into a pod as data volumes or injected as
environment variables, making them accessible to containers during runtime. Additionally,
secrets can be used internally by other components of the Kubernetes system without being
directly exposed to the pod.
Secrets store sensitive data in a Base64-encoded format. This encoding exists only to ensure safe
textual representation within YAML manifests and does not provide any real security benefit.
Anyone with access to the encoded data can easily decode it. To properly secure Secrets, enable
encryption at rest (for example, using a cloud-based KMS solution) and ensure they are
transmitted only over secure channels such as TLS.
To encode values using Base64, enter commands such as:
$ echo -n 'yourvalue' | base64
eW91cnZhbHVl

The following file with the name secret.yaml creates a secret:
kind: Secret

type: Opaque
data:
username: bWFyaWFkYg==

password: c2VjdXJlcGFzcw==

root-password: cm9vdHBhc3MxMjM=

Apply the file to create the secret with:
$ kubectl apply -f secret.yaml
secret/mariadb-secret created

Alternative, create the secret directly via the command line:
$ kubectl create secret generic mariadb-secret \
--from-literal=username=mariadb \
--from-literal=password=securepass

Now, use the secret in the definition of a pod to inject the values as environment variables into a
MariaDB container:
name: mariadb-pod
- name: mariadb
image: mariadb:11.3
- containerPort: 3306
env:
- name: MARIADB_USER
key: username
- name: MARIADB_PASSWORD

key: password
- name: MARIADB_ROOT_PASSWORD
key: root-password

This setup injects all three environment variables (MARIADB_USER, MARIADB_PASSWORD, and
MARIADB_ROOT_PASSWORD) into the MariaDB container from the secret named mariadb-secret.
If the previous configuration file is named maria.yaml, the pod can be created using:
$ kubectl apply -f maria.yaml
pod/mariadb-pod created

## 1. Write a YAML file to create a pod named my-pod that runs a busybox container executing the
command sleep 3600.

## 2. Create a deployment called nginx-deployment that runs two replicas of the nginx:1.25
image.

## 3. You have a deployment named nginx-deployment running two replicas of the nginx:1.25
image. Perform a rolling update to change the image version from nginx:1.25 to nginx:1.26.

## 4. You have a deployment named nginx-deployment currently running version nginx:1.26.
Assume that this new version introduced a problem and you need to roll back the deployment
to the previous stable version (nginx:1.25). What command can you use?

## 5. Create a secret containing APP_USER and APP_PASS, then inject them into a pod as
environment variables. How can you test results in the shell?

## 1. Create a simple pod running a container with the busybox image. Configure the container to
run a short-lived command such as sleep 5. Observe what happens after the container exits.
Then change the restartPolicy from Always to OnFailure and then to Never, and compare
the behavior in each case. What happens to the pod after the container finishes executing?

## 2. Configure a pod running the nginx image with a liveness probe on port 80 and a readiness
probe that waits for five seconds before checking. What is the difference between
livenessProbe and readinessProbe?

Kubernetes is a powerful container orchestration platform that enables developers and
operations teams to define, deploy, scale, and manage containerized applications with consistency
and efficiency. At its core, Kubernetes uses a declarative model driven by YAML files, which
describe the desired state of resources such as pods, deployments, services, and secrets. By
defining Infrastructure as Code, teams can version, audit, and reproduce their environments
more reliably across development, staging, and production.
To build and operate real-world applications in Kubernetes, it is essential to understand not only
the foundational unit — the pod — but also higher-level abstractions such s deployments and
StatefulSets, which manage application lifecycles.

## 1. Write a YAML file to create a pod named my-pod that runs a busybox container executing the
command sleep 3600.
name: my-pod
- name: busybox
command: ["sleep", "3600"]

To apply the file, enter:
$ kubectl apply -f my-pod.yaml

## 2. Create a deployment called nginx-deployment that runs two replicas of the nginx:1.25
image.
replicas: 2

To apply the file, enter:
$ kubectl apply -f nginx-deployment.yaml

## 3. You have a deployment named nginx-deployment running two replicas of the nginx:1.25
image. Perform a rolling update to change the image version from nginx:1.25 to nginx:1.26.
Perform the rolling update:
$ kubectl set image deployment/nginx-deployment nginx=nginx:1.26

Monitor the rollout status:
$ kubectl rollout status deployment/nginx-deployment

Verify the new image version:
$ kubectl get pods -l app=nginx -o wide

## 4. You have a deployment named nginx-deployment currently running version nginx:1.26.
Assume that this new version introduced a problem and you need to roll back the deployment
to the previous stable version (nginx:1.25). What command can you use?
To roll back to the previous version, enter:
$ kubectl rollout undo deployment/nginx-deployment

To monitor the rollback status, enter:
$ kubectl rollout status deployment/nginx-deployment

To verify the image version, enter:
$ kubectl get pods -l app=nginx -o wide

To view the rollout history, enter:
$ kubectl rollout history deployment/nginx-deployment

## 5. Create a secret containing APP_USER and APP_PASS, then inject them into a pod as
environment variables. How can you test results in the shell?
The configuration file for the secret, named secret.yaml, follows:
kind: Secret
name: app-credentials
type: Opaque
data:
APP_USER: YWRtaW4=

APP_PASS: c2VjdXJlcGFzcw== # "securepass"

The configuration file for the pod, named secret-pod.yaml, follows:
name: app-secret-pod
- name: app
command: ["sh", "-c", "env && sleep 3600"]
env:
- name: APP_USER
name: app-credentials
key: APP_USER
- name: APP_PASS
name: app-credentials
key: APP_PASS

To apply the configurations, enter:
$ kubectl apply -f secret.yaml
secret/app-credentials created
$ kubectl apply -f secret-pod.yaml
pod/app-secret-pod created

To check that the secret was incorporated into the pod, enter:
$ kubectl exec -it app-secret-pod -- printenv APP_USER APP_PASS
admin
securepass

## 1. Create a simple pod running a container with the busybox image. Configure the container to
run a short-lived command such as sleep 5. Observe what happens after the container exits.
Then change the restartPolicy from Always to OnFailure and then to Never, and compare
the behavior in each case. What happens to the pod after the container finishes executing?
Start by creating a simple pod with a busybox container that runs sleep 5, then exits:
name: test-pod
- name: sleeper
command: ["sleep", "5"]
restartPolicy: Always

Observation 1: restartPolicy: Always
After applying this configuration, you can observe that the container keeps restarting
continuously, because the sleep 5 command finishes quickly, and the pod is instructed to
always restart the container regardless of whether it exited successfully or failed.
Observation 2: restartPolicy: OnFailure
After the YAML is changed to restartPolicy: OnFailure and the file is re-applied, when the
container completes (which it does successfully, since sleep 5 has exit code 0), the container
does not restart. That’s because this policy restarts only containers that fail (i.e., exit with nonzero status). The pod status becomes Completed.
Observation 3: restartPolicy: Never
After the YAML is changed to restartPolicy: Never, regardless of whether the container
exits with success or failure, Kubernetes will not attempt to restart it. The pod simply finishes,
and its status becomes either Completed or Failed depending on the container’s exit code.
2. Configure a pod running the nginx image with a liveness probe on port 80 and a readiness
probe that waits for five seconds before checking. What is the difference between
livenessProbe and readinessProbe?

The configuration file for the pod, named probes.yaml, follows:
name: nginx-probes
livenessProbe:
httpGet:
path: /
initialDelaySeconds: 10
periodSeconds: 5
readinessProbe:
httpGet:
path: /
initialDelaySeconds: 5
periodSeconds: 3

+ To apply the file, enter:
+
$ kubectl apply -f probes.yaml
pod/nginx-probes created

+ A liveness probe checks whether the application inside the container is alive and should
continue to run. If the liveness probe fails, Kubernetes automatically restarts the container,
assuming it is in a bad state (e.g., frozen, unresponsive, or stuck).
+ A readiness probe checks whether the application is ready to handle requests. If the readiness
probe fails, Kubernetes removes the pod from the service load balancer until it becomes ready
again — but won’t restart the pod.

Kubernetes is a powerful platform for orchestrating containers, but managing real-world
applications involves more than just running pods. Systems in production need to expose
applications to users, route traffic intelligently, and ensure that data persists even if containers
are restarted or moved. This is where services, Ingresses, and PersistentVolumes come into play.

The Role of Services
When using a deployment to manage your application, Kubernetes automatically handles the
creation and deletion of pods to match the desired state. These pods are ephemeral: they can be
terminated and replaced at any time. Their number and identities (IP addresses, names) can
change frequently, making it unreliable to connect to them directly.
Each pod receives its own unique IP address, and Kubernetes relies on network plugins to provide
stable networking across the cluster. However, due to the dynamic behavior of pods, the set of
pods running at one moment may be completely different the next.
This presents a challenge: if one group of pods (e.g., backends) provides services to another group

of pods (e.g., frontends), how can the frontends discover and consistently connect to the correct
backend pods, whose IPs and identities are constantly changing?
This is exactly the problem that Kubernetes services solve. A service provides a stable network
endpoint and automatically routes traffic to the appropriate set of backend pods — no matter how
often those pods change — based on labels and selectors. It acts as a reliable gateway, abstracting
pod lifecycle and network changes from the application logic.

Defining a Service in Kubernetes
In Kubernetes, a service is an API object, just like a pod, ConfigMap, or deployment. Developers
and administrators can create, inspect, and update service definitions using the Kubernetes API.
In practice, most users interact with services using tools such as kubectl, which make those API
calls under the hood.
Imagine a group of pods that all listen on TCP port 3030 and share the label
app.kubernetes.io/name=MyApp. A service can expose those pods and forward traffic to that
specific port.
Here’s a sample manifest service/simple-service.yaml:
name: my-service
app.kubernetes.io/name: MyApp
targetPort: 3030

When you apply this manifest, Kubernetes creates a new service named my-service of type
ClusterIP by default. This service will route incoming traffic on port 80 to the targetPort 3030
on any pod that has the label app.kubernetes.io/name=MyApp.
This setup allows clients within the cluster to reach your pods through a stable network endpoint,
without needing to track individual pod IP addresses or lifecycle changes.
There are several types of services. The following sections describe ClusterIP, NodePort,
LoadBalancer, and ExternalName.

ClusterIP is the default Kubernetes service type, providing a stable internal IP address that
exposes the service only within the cluster. Because this address is not accessible from outside the
cluster, it is ideal for internal microservices communication.
To demonstrate ClusterIP in practice, start by creating a ClusterIP service that exposes an
Nginx deployment within the cluster. Name the file nginx-deployment.yaml:
replicas: 2

Apply the configuration as follows:
$ kubectl apply -f nginx-deployment.yaml
deployment.apps/nginx-deployment created

Then create a ClusterIP service to expose the port internally. Name this file clusterip.yaml:
name: nginx-service

type: ClusterIP

Apply this manifest as follows:
$ kubectl apply -f clusterip.yaml
service/nginx-service created

The service nginx-service now will route traffic to all pods with the label app: nginx. Other
pods in the cluster can reach the service using the name nginx-service on port 80. For example,
a frontend pod can connect using:
$ kubectl run frontend-pod --rm -i -t --image=busybox --restart=Never -- sh
/ #

Inside the interactive shell, enter:
/ # wget -qO- http://nginx-service

NodePort is a type of service that exposes an application on a specific port across all nodes in the
cluster. When a service is defined as a NodePort, Kubernetes opens a static port on each node,
allowing external traffic to reach the application using the node’s IP address and the assigned
port.
A NodePort service allows external traffic to access your application via a URL in the form
http://<NodeIP>:<NodePort>

Kubernetes opens the same port on all cluster nodes and routes traffic to the matching pods.
In the following example of NodePort, any request sent to port 30001 of a node will be forwarded
to port 80 of the matching pods (based on the app: nginx selector). Name the file
nodeport.yaml:
name: nginx-nodeport
type: NodePort

nodePort: 30001

To apply this manifest, enter:
$ kubectl apply -f nodeport.yaml
service/nginx-nodeport created
$ kubectl get svc

kubernetes

28h

nginx-nodeport

10.104.66.104

80:30001/TCP

56s

This service selects pods with the label app: nginx (from nginx-deployment). Port 80 is exposed
on the service and mapped to port 80 on the container. The configuration also opens NodePort
30080 on every node in the cluster.
At this point, the Nginx service is exposed outside the cluster. It can be accessed using the IP
address of any node in the cluster, along with the port defined in the service configuration.
To find the IP address of a node, enter:
$ kubectl get nodes -o wide

ROLES

VERSION

INTERNAL-IP

OS-IMAGE

KERNEL-VERSION

CONTAINER-RUNTIME

control-plane

Ready

22.04.5 LTS

6.11.0-21-generic

28h

v1.32.0

192.168.49.2

Ubuntu

docker://27.4.1

The node has the IP address 192.168.49.2. Using this, retrieve the home page from Nginx:
$ curl http://192.168.49.2:30001

LoadBalancer is a Kubernetes service type designed to expose applications to external traffic by
integrating with cloud-based load balancers (e.g., AWS Elastic Load Balancer, Google Cloud Load
Balancer). When a service is configured as a LoadBalancer, Kubernetes automatically provisions
an external load balancer and assigns it a stable IP address, routing incoming traffic to the
appropriate pods within the cluster.
An example follows of manifest for a LoadBalancer named nginx-deployment. Name the file
load.yaml:
name: nginx-loadbalancer
type: LoadBalancer

$ kubectl apply -f load.yaml

service/nginx-loadbalancer created

To find the external IP address, enter:
$ kubectl get svc nginx-loadbalancer

nginx-loadbalancer

10.99.130.204

35.239.87.15

80:31142/TCP

28s

To test the service using curl, enter:
$ curl http://35.239.87.15

When you create a service of type LoadBalancer, Kubernetes sends a request to the cloud
provider (e.g., AWS, Google Cloud, Azure) to provision a public load balancer.
However, this works only if your cluster is running on a cloud platform that supports external
load balancers and has been properly configured with cloud controller integration.
If you run the previous example in a local cluster (like Minikube, MicroK8s, or Kind), or in a baremetal environment (your own server), there is no cloud provider to fulfill the request. As a result,
Kubernetes can’t assign a public IP address, and you’ll see something like this:
$ kubectl get svc nginx-loadbalancer

nginx-loadbalancer

10.99.130.204

<pending>

80:31142/TCP

28s

The <pending> status under EXTERNAL-IP means: “I’m waiting for the cloud provider to assign a
public IP address, but no one has responded to my request.” The request never succeeds because
there is no integrated cloud controller (like GCP’s or AWS’s load balancer manager) listening and
acting on this service creation.

ExternalName
A service of type ExternalName does not route traffic to pods, but instead acts like a DNS alias
inside the cluster. It allows clients to refer to an external hostname (outside the Kubernetes
cluster) as if it were a native service. This is useful to access external services (such as a thirdparty API, legacy database, or hosted solution) using a Kubernetes-native DNS name.
When an ExternalName service is defined and created, Kubernetes creates a CNAME record in its

internal DNS registry. When other pods query http://my-db.default.svc.cluster.local, for
example, they are actually being redirected to an external hostname like
database.example.com.
There is no selector, no Pod definition, no endpoint — just a DNS redirect.
An example of an ExternalName service follows. Name the file external.yaml:
name: example-org
type: ExternalName
externalName: example.org

This will create a DNS entry named example-org.default.svc.cluster.local and direct its
traffic to example.org.
Apply the manifest as follows:
$ kubectl apply -f external.yaml
service/example-org created

Inside any pod in the cluster, a client can now connect to the example.org service. Since the
server at example.org does not recognize example-org as a valid domain, you can force curl to
send the correct Host header using the -H option:
$ kubectl run test-client --rm -it --image=curlimages/curl --restart=Never -- sh
$ curl -H "Host: example.org" http://example-org
<!doctype html>
<title>Example Domain</title>

Ingresses in Kubernetes
While services expose pods, they are not flexible when it comes to HTTP routing, host-based
access, or TLS termination. That’s where Ingresses come in.

An Ingress is a collection of rules that allow external access to services in the cluster, typically
over HTTP or HTTPS. Ingress sits in front of multiple services and acts like a smart router.
Unlike NodePort and LoadBalancer, Ingress doesn’t handle network traffic directly — it relies on
an Ingress controller, such as Nginx or Traefik, to do the actual work.
An Ingress in Kubernetes exposes HTTP and HTTPS routes from outside the cluster to services
within it, allowing access through well-defined and externally reachable URLs. It supports namebased virtual hosting, meaning that different services can be reached via different hostnames
under the same IP address. Ingress also supports path-based routing, directing traffic to different
backends based on the URL.
One of the key features of Ingress is its ability to automatically redirect HTTP traffic to HTTPS,
enhancing security by enforcing encrypted connections. Custom TLS certificates can also be
configured in order to secure communications, and many Ingress controllers support wildcard
hostnames, enabling routing for dynamic subdomains like *.example.com.
In most Kubernetes clusters with an Ingress controller, the IP address can be shared among
multiple services through name-based virtual hosting. Therefore, Ingress needs to be deployed
along with an Ingress controller, such as Nginx, HAProxy or Traefik, which handles the routing.
An example of using Ingress to route to traffic to an Nginx service named ingress.yaml follows.
Name the file in.yaml:
apiVersion: networking.k8s.io/v1
kind: Ingress
name: nginx-ingress
annotations:
nginx.ingress.kubernetes.io/rewrite-target: /
rules:
- host: myapp.local
http:
- path: /
pathType: Prefix
backend:
service:
name: nginx-service
port:
number: 80

This Ingress resource defines a rule that routes HTTP traffic based on the hostname and path. The
host: myapp.local field specifies the hostname that this rule applies to. The Ingress matches
only requests with this host in the HTTP Host header. The backend section defines the target
service and port that should receive the traffic; in this case, traffic is forwarded to the nginxservice service on port 80.
To apply this manifest, enter:
$ kubectl apply -f in.yaml
ingress.networking.k8s.io/nginx-ingress created
$ kubectl get ingress

CLASS

HOSTS

ADDRESS

nginx-ingress

myapp.local

192.168.49.2

80

3m

When a request like the following hits the cluster
GET / HTTP/1.1
Host: myapp.local

the Ingress does the following:
1. Matches the host to myapp.local.
2. Matches the path to /.
3. Rewrites the path to / (if needed).
## 4. Sends the request to nginx-service:80.
To test the service locally (using Minikube or Kind), add the following entry to your /etc/hosts
file:
192.168.49.2 myapp.local

Now query the service using your browser or using curl in the terminal:
$ curl http://myapp.local

## 1. Create a deployment named my-app-deployment that runs three replicas of the httpd:2.4
image, and use the env=testing label.

## 2. Create a service named my-app-service that exposes the my-app-deployment service on
port 80 using the default service type ClusterIP. The service should route traffic to pods
labeled with env=testing, forwarding to container port 80.

## 3. Create a service named my-app-nodeport of type NodePort that allows external access to the
application. The service should expose port 80 to the client, forward traffic to container port 80,
and use a NodePort in the range 30000-32767.

4. Assume that a service named my-app-service exists. Create an Ingress named my-appingress that exposes it externally. The Ingress should route HTTP traffic from the path / to
the my-app-service. Use host myapp.example.com for the host.

## 1. Explore how a Kubernetes service dynamically handles changes in the underlying pods and
continues to route traffic reliably. Do the following:
- Create a deployment named http-echo using the image hashicorp/http-echo, with the
argument -text="Hello from Pod". Add the label http-echo to the deployment.

- Expose the deployment using a service named echo-service on port 5678.

- Send multiple HTTP requests to the service using kubectl port-forward or by running
curl from another pod.

- Scale the deployment to four replicas and observe how traffic is distributed among the pods.

2. Delete one of the pods in the previous exercise manually and resend requests.

- Does the service continue to route requests evenly across the remaining pods?

- Is there any interruption in traffic when a pod is deleted?

- How does the service behave when pods are added or removed?

## 3. Understand the difference in accessibility between a ClusterIP service and a NodePort
service. Do the following:
- Create a deployment named web-deployment with two replicas of the nginx:alpine
image and label it myapp=web.

- Expose the application using two services: one named web-clusterip of type ClusterIP,
and one named web-nodeport of type NodePort with port 30090.

- From within a pod inside the cluster, test access to both services using wget.

- From outside the cluster (your local machine or browser), try accessing both services using
the IP address of a node.

Answer the following questions:
- Which service is accessible from outside the cluster and why?

- What is the difference (if any) in how the two services handle DNS resolution?

Kubernetes offers a robust framework for managing containerized applications, but going from
deployment to production requires more than just launching pods. To make applications
accessible, resilient, and persistent, Kubernetes introduces key components such as services,
Ingresses, and PersistentVolumes.
Ingresses add an additional layer of intelligent routing for HTTP/HTTPS traffic, allowing users to
expose multiple services through a single external IP address with host-based and path-based
rules. Ingress Controllers, such as Nginx, handle the actual routing and support such features as
TLS termination and request rewriting.

## 1. Create a deployment named my-app-deployment that runs three replicas of the httpd:2.4
image, and use the env=testing label.
The following manifest is named httpd.yaml:
name: my-app-deployment
replicas: 3
app: my-app
app: my-app
- name: httpd
image: httpd:2.4

$ kubectl apply -f httpd.yaml
deployment.apps/my-app-deployment created

To see the running pods in this service, run kubectl get pods and filter output by the label
env=testing:
$ kubectl get pods -l env=testing

my-app-deployment-9b985546c-cz4vv

81s

my-app-deployment-9b985546c-d4qjm

81s

my-app-deployment-9b985546c-x9ksv

81s

## 2. Create a service named my-app-service that exposes the my-app-deployment service on
port 80 using the default service type ClusterIP. The service should route traffic to pods
labeled with env=testing, forwarding to container port 80.
The following manifest is named service.yaml:
name: my-app-service
type: ClusterIP

$ kubectl apply -f service.yaml

Check the service:
$ kubectl get svc

kubernetes

13h

my-app-service

10.100.111.61

80/TCP

5s

Alternatively, you can use the kubectl command to create the service directly, without relying
on a configuration file:
$ kubectl expose deployment my-app-deployment --name=my-app-service --port=80 --target
-port=80 --type=ClusterIP

## 3. Create a service named my-app-nodeport of type NodePort that allows external access to the

application. The service should expose port 80 to the client, forward traffic to container port 80,
and use a NodePort in the range 30000-32767.
The following manifest is named nodeport.yaml:
name: my-app-nodeport
type: NodePort

nodePort: 30080

$ kubectl apply -f nodeport.yaml

Check the created service:
$ kubectl get svc my-app-nodeport

my-app-nodeport

10.103.97.198

80:30080/TCP

19s

4. Assume that a service named my-app-service exists. Create an Ingress named my-appingress that exposes it externally. The Ingress should route HTTP traffic from the path / to
the my-app-service. Use host myapp.example.com for the host.
The following manifest is named ingress.yaml:
apiVersion: networking.k8s.io/v1
kind: Ingress
name: my-app-ingress
annotations:

nginx.ingress.kubernetes.io/rewrite-target: /
rules:
- host: myapp.example.com
http:
- path: /
pathType: Prefix
backend:
service:
name: my-app-service
port:
number: 80

$ kubectl apply -f ingress.yaml
ingress.networking.k8s.io/my-app-ingress created

Verify the Ingress:
$ kubectl get ingress my-app-ingress

CLASS

HOSTS

my-app-ingress

myapp.example.com

ADDRESS

80

34s

## 1. Explore how a Kubernetes service dynamically handles changes in the underlying pods and
continues to route traffic reliably. Do the following:
- Create a deployment named http-echo using the image hashicorp/http-echo, with the
argument -text="Hello from Pod". Add the label http-echo to the deployment.
name: http-echo
replicas: 1
app: http-echo
app: http-echo
- name: http-echo
image: hashicorp/http-echo
args:
- -text=hello world
- containerPort: 5678

- Expose the deployment using a service named echo-service on port 5678.
$ kubectl expose deployment http-echo --name=echo-service --port=5678 --target
-port=5678

- Send multiple HTTP requests to the service using kubectl port-forward or by running
curl from another pod:
$ kubectl port-forward service/echo-service 8080:5678 &
[1] 1251938
Forwarding from 127.0.0.1:8080 -> 5678

Forwarding from [::1]:8080 -> 5678

Now you can use curl to test the service:
$ curl http://localhost:8080
Handling connection for 8080
hello world

- Scale the deployment to four replicas and observe how traffic is distributed among the
pods.:
$ kubectl scale deployment http-echo --replicas=4
deployment.apps/http-echo scaled

Check the pods:
$ kubectl get pods

http-echo-7f5b99dfd8-7s9g7

26s

http-echo-7f5b99dfd8-n5ftn

26s

http-echo-7f5b99dfd8-n5wrb

26s

http-echo-7f5b99dfd8-p48wn

2. Delete one of the pods in the previous exercise manually and resend requests.
$ kubectl delete pod http-echo-7f5b99dfd8-7s9g7

- Does the service continue to route requests evenly across the remaining pods?
Yes, Kubernetes automatically routes requests to all matching and ready pods.
- Is there any interruption in traffic when a pod is deleted?
No, the service continues routing to the remaining pods without downtime.
- How does the service behave when pods are added or removed?
The service immediately updates its list of endpoints. New pods are included as soon as
they’re ready, and terminated pods are removed instantly from the routing list.

## 3. Understand the difference in accessibility between a ClusterIP service and a NodePort
service. Do the following:
- Create a deployment named web-deployment with two replicas of the nginx:alpine
image and label it myapp=web.
$ kubectl create deployment web-deployment --image=nginx:alpine --replicas=2
deployment.apps/web-deployment created
$ kubectl label deployment web-deployment myapp=web
deployment.apps/web-deployment labeled

- Expose the application using two services: one named web-clusterip of type ClusterIP
and one named web-nodeport of type NodePort with port 30090.
The following exposes web-clusterip:
$ kubectl expose deployment web-deployment --name=web-clusterip --port=80 --target
-port=80 --type=ClusterIP
service/web-clusterip exposed

The following exposes web-nodeport:
$ kubectl expose deployment web-deployment --name=web-nodeport --port=80 --target
-port=80 --type=NodePort
service/web-nodeport exposed
$ kubectl patch service web-nodeport -p '{"spec": {"ports": [{"port": 80,
"targetPort": 80, "protocol": "TCP", "nodePort": 30090}]}}'
service/web-nodeport patched

- From within a pod inside the cluster, test access to both services using wget.
$ kubectl run test-pod --rm -it --image=busybox -- /bin/sh
If you don't see a command prompt, try pressing enter.
/ # wget -qO- http://web-clusterip
/ # wget -qO- http://web-nodeport

- From outside the cluster (your local machine or browser), try accessing both services using
the IP address of a node.
First, get the node’s IP address:
$ kubectl get node -o wide

ROLES

KERNEL-VERSION
Ready

Ubuntu 22.04.5 LTS

control-plane

VERSION

INTERNAL-IP

OS-

CONTAINER-RUNTIME
14h

6.11.0-21-generic

v1.32.0

192.168.49.2

docker://27.4.1

Access it using the URL and port exposed through the NodePort service:
$ curl 192.168.49.2:30090
(....)

Access it using the local URL through the ClusterIP service:
$ curl http://localhost:80
curl: (7) Failed to connect to localhost port 80 after 0 ms: Couldn't connect to
server

- Which service is accessible from outside the cluster and why?
web-clusterip is not accessible from outside the cluster — it is reachable only from inside.
web-nodeport is accessible externally via <Node-IP>:30090.
- What is the difference (if any) in how the two services handle DNS resolution?
There is no difference in how DNS resolution works between a ClusterIP and a NodePort
service within the Kubernetes cluster. Both services are assigned a DNS name by Kubernetes
in the format:

<service-name>.<namespace>.svc.cluster.local

Applications running inside the cluster can resolve and access both services using these
names or simply web-clusterip and web-nodeport.

Kubernetes is designed to treat pods as ephemeral: they can be created, destroyed, or rescheduled
at any time. This behavior is ideal for stateless workloads, but unsuitable for applications that
need to persist data, such as databases, file servers, or message brokers.
To solve the challenge of persisting data in an environment where pods are short-lived and
frequently rescheduled, Kubernetes introduces a decoupled storage model. Rather than
embedding storage details directly into application definitions, Kubernetes cleanly separates
storage provisioning from storage requests, enabling greater flexibility, reusability, and
scalability.
In this model, PersistentVolumes (PVs) and PersistentVolumeClaims (PVCs) play a central role. PVs
represent actual storage resources available in the cluster while PVCs are requests made by
applications for specific types and amounts of storage. This abstraction is essential for supporting
stateful applications that require reliable and consistent storage.

Persistent Storage in Kubernetes
When a pod is deleted or crashes, all data stored inside the container is lost. This is fine for
stateless apps like web servers, but it is a problem for apps that need to store data, like databases
or file-based services.
To solve this, Kubernetes provides a way to connect pods to persistent storage that survives
restarts, rescheduling, and even node failures. This is done using PersistentVolumes (PV) and
PersistentVolumeClaims (PVC).

PersistentVolume (PV)
A PersistentVolume (PV) is a unit of storage in the cluster, provisioned by an administrator or
dynamically by a StorageClass. PVs abstract the underlying storage infrastructure. A PV can
represent storage from a variety of sources, such as local disks, NFS, or cloud-based volumes (e.g.,
AWS EBS, GCE Persistent Disks).
The PV exists independently of any pod lifecycle. It can be statically provisioned (that is, manually
defined by administrators) or dynamically provisioned (automatically created by Kubernetes
when a PVC requests storage).
PVs don’t typically appear directly in pod definitions. Instead, pods use PVCs, which Kubernetes
then matches with available PVs.

PersistentVolumeClaim (PVC)
A PersistentVolumeClaim (PVC) is a request for storage. It specifies how much space is needed and
the access mode (e.g., ReadWriteOnce, ReadOnlyMany, ReadWriteMany). PVCs act as an
abstraction layer between pods and PVs, making storage management more user-friendly.
When a PVC is created, Kubernetes looks for a PV that satisfies the request. Once bound to the PV,
the pod can mount it and use it like a normal directory.
In Kubernetes, access modes in a PersistentVolumeClaim determine how the volume can be
mounted by pods:
ReadWriteOnce
The volume can be mounted as read-write by only one node at a time. This is the most common
and widely supported mode and is typically used when a single pod or a group of pods on the
same node needs full read/write access to the storage.

ReadOnlyMany
The volume can be mounted by multiple nodes, but only in read-only mode. This is useful for
scenarios where many pods need access to the same data but don’t need to modify it — for
example, when serving static website content or shared reference data.
ReadWriteMany
The most flexible mode. It permits the volume to be mounted as read-write by multiple nodes
simultaneously. This is essential for distributed applications that need concurrent read/write
access to the same data, such as shared logging, collaboration tools, or network file systems.
However, support for ReadWriteMany depends on the underlying storage system — not all
volume types provide it by default.

Lifecycle of a PersistentVolume and a PersistentVolumeClaim
In Kubernetes, PersistentVolumes (PVs) are storage resources available in the cluster, while
PersistentVolumeClaims (PVCs) are requests for those resources. A PVC acts as both a request and
a “claim check” for a specific volume. The interaction between PVs and PVCs follows a welldefined lifecycle composed of the following stages.

Provisioning
There are two ways to provision volumes in a Kubernetes cluster: statically or dynamically.
Static provisioning
A cluster administrator manually creates a set of PVs in advance. These volumes refer to real
storage (e.g., NFS, cloud disks) and are registered in the Kubernetes API, ready to be claimed by
users via PVCs.
Dynamic provisioning
If no existing static PV matches a user’s PVC request (in terms of size, access mode, or other
attributes), Kubernetes can automatically provision a volume. This is known as dynamic
provisioning, and it relies on a StorageClass.
To use dynamic provisioning the PVC must specify a valid storageClassName and the cluster
administrator must have previously created and configured a compatible StorageClass.
If a PVC specifies storageClassName: "", it explicitly disables dynamic provisioning for that
claim.
To enable dynamic provisioning, the cluster must enable the DefaultStorageClass admission
controller. This is configured via the --enable-admission-plugins option in the kube-

apiserver component.

Binding
Once a user submits a PVC — either triggering dynamic provisioning or requesting a match with
existing PVs — a control loop in the Kubernetes control plane attempts to bind the PVC to a
suitable PV. The following sequence applies:
- If a PV was dynamically created for the PVC, they are bound automatically.
- If matching static PVs are available, Kubernetes chooses the best fit.
- Once bound, a PVC is exclusively attached to that PV through a ClaimRef, forming a one-to-one
relationship.
The PVC will always receive at least what it requested, although the PV may exceed those specs
(e.g., a 100G PV for a 50G claim). If no matching PV exists, the claim remains unbound until a
compatible PV becomes available. For example, if all available PVs are 50G and a PVC requests
100G, it won’t be bound until a 100G PV is added to the cluster.
If the volume supports multiple access modes (e.g., ReadWriteOnce, ReadOnlyMany), the desired
mode must be specified in the pod configuration.
After successful binding, the volume remains dedicated to the user for as long as the claim exists.
Users can create and schedule pods that access the claimed volume through the PVC.
Once a PVC is successfully bound to a PV, it can be used by pods as a volume through the following
process:
- The pod references the PVC in its volumes section.
- Kubernetes automatically finds the associated PV and mounts it into the pod.

Managing Persistent Volumes and Claims in Kubernetes
A simple example can demonstrate how PersistentVolumeClaims (PVCs) are used in practice. First,
the example creates a PVC that requests 1G of storage with read-write access. It then uses this PVC
in a pod that mounts the volume and writes a file to it. The example illustrates the typical
workflow of claiming storage and consuming it within a containerized application.
The following file, named pvc.yaml, creates the a PVC:

name: my-pvc

$ kubectl apply -f pvc.yaml
persistentvolumeclaim/my-pvc created

The following manifest refers to the PVC in a pod. The file is named pod.yaml:
name: pod-using-pvc
- name: app
command: ["sh", "-c", "echo Hello > /data/hello.txt && sleep 3600"]
- mountPath: "/data"
name: storage
- name: storage
claimName: my-pvc

Create the pod and view the PVC:
$ kubectl apply -f pod.yaml
pod/pod-using-pvc created
$ kubectl get pvc

VOLUME

STORAGECLASS

my-pvc

Bound

pvc-65413e21-b2f6-4aa5-bc40-5590d61deae9

standard

In this example, the pod uses the PVC my-pvc to mount a volume at /data. The container writes a
simple text file (hello.txt) to the mounted volume and then sleeps for one hour. This
demonstrates how persistent storage can be attached to a running pod, enabling data to survive
container restarts or recreations.
To verify whether the hello.txt file was actually written to the persistent volume mounted at
/data, access the pod and navigate to the mounted directory:
$ kubectl exec -it pod-using-pvc -- sh
/ # cd /data
/data # ls -l
total 1
-rw-r--r--

1 root

root

6 Apr

4 13:58 hello.txt

/data # cat hello.txt
Hello
/data # exit

The Retain Reclaim Policy
The reclaim policy of a PV determines what happens to the underlying storage when the PVC is
deleted. When the reclaim policy is set to Retain, the storage is preserved even after the PVC is
removed. This means that the PV and its data remain intact, but the PV enters a Released state,
indicating that it is no longer bound to a PVC but still contains data. It is the responsibility of the
administrator to manually clean up the data or reuse the volume.
This policy is useful when you want to ensure that no data is lost unintentionally, such as in cases
where data needs to be recovered or transferred to a different PVC later.
The following example creates a PersistentVolume with the Retain reclaim policy to ensure that
the data remains intact and is not automatically deleted when the corresponding PVC is deleted.
The manifest is named pv.yaml:
kind: PersistentVolume

name: retain-pv
capacity:
persistentVolumeReclaimPolicy: Retain

path: /mnt/data-retain

$ kubectl apply -f pv.yaml
persistentvolume/retain-pv created

To check that the PV was created, enter:
$ kubectl get pv

Now that the PersistentVolume is configured with the Retain reclaim policy, create the
corresponding PVC request. The following manifest is named pvc-request.yaml:
name: retain-pvc

To apply the PVC, enter:
$ kubectl apply -f pvc-request.yaml

persistentvolumeclaim/retain-pvc created

Verify that the retain-pv PV is successfully bound to the retain-pvc claim:
$ kubectl get pv

CLAIM

Bound

default/retain-pvc

Next, create a pod that uses the PVC to access the persistent storage. The following manifest is
named pod-retain.yaml:
name: write-to-retain-pv
- name: writer
command: ["sh", "-c", "echo Retained Data > /data/message.txt && sleep 3600"]
- name: retained-storage
mountPath: /data
- name: retained-storage
claimName: retain-pvc

$ kubectl apply -f pod-retain.yaml
pod/write-to-retain-pv created

Verify that the data has been successfully written to the volume:
$ kubectl exec -it write-to-retain-pv -- sh
/ # cat /data/message.txt
Retained Data

Now delete the pod and its associated PVC to observe how the volume behaves after claim
deletion:
$ kubectl delete pod write-to-retain-pv
pod "write-to-retain-pv" deleted
$ kubectl delete pvc retain-pvc
persistentvolumeclaim "retain-pvc" deleted

Check the status of the PersistentVolume:
$ kubectl get pv retain-pv

CLAIM

Released

default/retain-pvc

After deleting the original PVC, the PV is now in the Released state, indicating that the retainpvc PVC has been deleted, but the data remains and the volume can be reused. To reuse it,
manually remove the claimRef claim:
$ kubectl patch pv retain-pv -p '{"spec":{"claimRef": null}}'
persistentvolume/retain-pv patched

Prove that the PV is still present and usable by creating a new PVC to bind to the existing PV. The
following manifest is named new-pvc.yaml:
name: new-retain-pvc

$ kubectl apply -f new-pvc.yaml
persistentvolumeclaim/new-retain-pvc created

To verify the PV is now bound to the new PVC, enter:
$ kubectl get pv retain-pv

CLAIM

Bound

default/new-retain-pvc

Other Kubernetes Orchestration Resources
To wrap up the discussion of Kubernetes, this section presents some features of Kubernetes that
address important needs and are worth knowing about.

DaemonSets
A DaemonSet can be used when the application needs to ensure that a specific pod runs on every
node in the cluster, or on a selected group of nodes. This approach is commonly used for
background services such as monitoring agents, log collectors, or networking components that
must be present on every node.
When new nodes are added to the cluster, the DaemonSet automatically creates a pod on each of
them. Likewise, when nodes are removed, their associated pods are also deleted.
DaemonSets are ideal for deploying a service or agent that runs universally across the

StatefulSets
A StatefulSet handles applications that require stable identities, persistent storage, and ordered
deployment or scaling. Unlike deployments, which treat pods as interchangeable units,
StatefulSets give each pod a fixed hostname and its own persistent volume. This is particularly
important for databases or distributed systems such as MongoDB, Kafka, or Zookeeper, where
each node in the system needs to retain its identity and data even after being restarted or
rescheduled.
StatefulSets also manage the rollout and termination of pods in a defined order, making them well
suited for an application that depends on an initialization sequence.

Jobs
A job in Kubernetes runs a task that executes once and completes. Jobs are ideal for short-lived,
run-to-completion workloads like batch processing, data migration, or report generation.
When a job is submitted, Kubernetes creates one or more pods to complete the task. The job
completes successfully when the assigned pods finish their work. If any pod fails, Kubernetes can
retry the task depending on the specified configuration. Once complete, the job is not restarted
unless manually resubmitted or scheduled to repeat through another mechanism.

CronJobs
CronJobs build on the concept of jobs by allowing them to run on a defined time schedule. Much
like a traditional cron job in Linux, a Kubernetes CronJob lets users run tasks at fixed times or
intervals. For example, an administrator can schedule a pod to run every hour to generate system
backups or to clean up temporary files each night. The CronJob resource handles the timing, while
each individual run of the job behaves like a regular Kubernetes job — meaning that it starts,
completes, and exits without persisting as a running service.

## 1. Create a PersistentVolumeClaim named mariadb-pvc, requesting 200M of storage. Use it to
persist the data of a MariaDB container. The pod should run a MariaDB service with a custom
root password. Mount the volume at /var/lib/mysql.

2. A PersistentVolume named retain-pv exists with the Retain reclaim policy. Create a PVC
named archive-pvc that binds to this PV and writes a file. Then delete the pod and PVC, patch
the PV to remove the claimRef, and create a new PVC named recover-pvc to reclaim the
same volume.

## 1. Create a pod with two containers that communicate through a shared volume. One container
should write a message to a file, and the other should read and display the contents of that file.

## 2. What’s the difference between using a volume in Kubernetes with a PersistentVolumeClaim
and without a PersistentVolumeClaim?

Kubernetes treats pods as ephemeral by design, which makes them ideal for stateless applications
but problematic for workloads that need persistent storage. To solve this, Kubernetes introduces a
decoupled storage model using PersistentVolumes (PVs) and PersistentVolumeClaims (PVCs). PVs
represent actual storage resources available in the cluster, while PVCs act as user or application
requests for those resources. This separation allows for both dynamic and static provisioning of
storage and ensures that stateful applications like databases, file servers, and message queues can
maintain their data even when pods are rescheduled or restarted.
PVCs provide a consistent and reusable way for pods to access storage, with support for different
access modes and lifecycle management. Kubernetes matches PVCs with available PVs and binds
them, allowing pods to mount and write data reliably. In scenarios where data must be preserved
even after a PVC is deleted, administrators can use a PV with a Retain reclaim policy, which holds
the data and makes the volume reusable.
