---
id: lpi-701-200-03
title: "LPIC-1 · 701-200 — You are releasing a new version of your application and want to…"
slug: lpi-701-200-03-lpic-1-701-200-you-are-releasing-a-new-version-of-your-appli
source: "LPI Learning Material — LPIC-1 (Exam 701-200)"
sourceSection: "2. You are releasing a new version of your application and want to minimize risk while allowing, 3. You are releasing an update that adds a new feature to your API but does not break any, 4. Your team is using GitOps to manage Kubernetes deployments. A manual change is made, 1. Choose two popular CI"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "This lesson introduced the core concepts of continuous integration (CI) and continuous delivery Covers 18 sections: You are releasing a new version of your application and want to minimize risk while allowing, You are releasing an updat."
---
# LPIC-1 · 701-200 — You are releasing a new version of your application and want to…

## 2. You are releasing a new version of your application and want to minimize risk while allowing
for a quick rollback if something goes wrong. Which deployment strategy would you choose,
and why?

## 3. You are releasing an update that adds a new feature to your API but does not break any
existing functionality. According to semantic versioning, how should you update the version
number?

## 4. Your team is using GitOps to manage Kubernetes deployments. A manual change is made
directly in the cluster, outside of Git. Explain how the reconciliation loop will handle this
situation.

5. Your team is preparing to release a new version of a payment service. The service is missioncritical and must not disrupt user transactions. You want to minimize risk, monitor real user
traffic behavior, and avoid any impact on the entire user base in case of a bug. Which
deployment strategy is more appropriate in this case: blue-green or canary? Justify your
answer.

## 1. Choose two popular CI/CD platforms (e.g., Jenkins, GitLab CI, GitHub Actions, CircleCI, Travis CI)
and compare their configuration approach, ease of use, and integration with source control
systems. Which one would you prefer for a containerized microservices project, and why?

## 2. Using a GitOps tool such as Argo CD or Flux, manually modify a deployment in a Kubernetes
cluster and observe the behavior. What action does the GitOps controller take, and why?

This lesson introduced the core concepts of continuous integration (CI) and continuous delivery
(CD), essential practices for automating and streamlining modern software development
workflows. It also explored the concept of GitOps, which uses Git as the single source of truth for
managing both infrastructure and application deployments. Learners examined the main
components of a CI/CD pipeline, including build processes, unit/integration/acceptance testing,
artifact management, and the stages of application delivery and deployment. The lesson
emphasized the importance of build artifacts and caches for faster builds, and highlighted how
semantic versioning ensures consistent and traceable releases.
Additionally, the lesson covered best practices for managing multiple environments such as
development, staging, and production. Advanced deployment strategies were discussed —
including preview releases, feature toggles, A/B testing, blue-green and canary deployments, and
reconciliation loops — all designed to improve reliability and flexibility during rollouts. Finally, it
introduced key CI/CD tools such as Jenkins, GitLab CI, Artifactory, and Nexus, demonstrating how
declarative pipelines provide a clean, maintainable way to define automation flows across
software delivery systems.

1. A developer pushes a change to the main branch of a Git repository. The project uses a full
CI/CD pipeline with automated tests and deployments. Describe the sequence of stages that the
code change will go through before it is deployed to production.
After the developer pushes the change, the CI/CD pipeline is triggered automatically. First, the
build stage compiles the source code and resolves dependencies. Then, unit tests run to verify
the correctness of individual components. If those tests pass, integration tests validate how
different modules interact. Next, artifact management packages and stores the build (e.g., as a
Docker image). The application is then deployed to a staging environment, where acceptance
tests run. If successful, the release is finally deployed to production, either with manual
approval (continuous delivery) or automatically (continuous deployment).
2. You are releasing a new version of your application and want to minimize risk while allowing
for a quick rollback if something goes wrong. Which deployment strategy would you choose,
and why?
A blue-green deployment would be ideal. This strategy involves deploying the new version to
an idle environment (green) while the current version (blue) continues to serve users. Once the
green environment is validated, traffic is switched over. If problems occur, you can quickly
revert traffic to the blue environment. This minimizes downtime and provides a safe rollback
mechanism.
3. You are releasing an update that adds a new feature to your API but does not break any
existing functionality. According to semantic versioning, how should you update the version
number?
Because the change adds a new feature without breaking existing functionality, you should
increment the minor version. For example, if the current version is 2.4.1, the new version
should be 2.5.0. The major version remains the same, and the patch version resets to zero.
4. Your team is using GitOps to manage Kubernetes deployments. A manual change is made
directly in the cluster, outside of Git. Explain how the reconciliation loop will handle this
situation.
In a GitOps setup, the reconciliation loop continuously compares the cluster’s actual state with
the desired state defined in the Git repository. When the loop detects that the actual state has
diverged (due to the manual change), the GitOps controller (e.g., Argo CD or Flux) will attempt
to restore the cluster to match the Git configuration. This ensures consistency, enforces
declarative configuration, and prevents configuration drift.

5. Your team is preparing to release a new version of a payment service. The service is missioncritical and must not disrupt user transactions. You want to minimize risk, monitor real user
traffic behavior, and avoid any impact on the entire user base in case of a bug. Which
deployment strategy is more appropriate in this case: blue-green or canary? Justify your
answer.
Canary deployment is the better choice in this scenario. Because the payment service is critical
and highly sensitive to errors, canary deployments allow the new version to be released
gradually to a small subset of users. This enables real-time monitoring of system behavior in
production, reducing the risk of widespread failures. If issues are detected, the deployment can
be halted or rolled back before affecting the majority of users. While blue-green deployment
also allows rollback, it shifts 100% of traffic at once, which may be too risky for high-impact
services such as payments.

## 1. Choose two popular CI/CD platforms (e.g., Jenkins, GitLab CI, GitHub Actions, CircleCI, Travis CI)
and compare their configuration approach, ease of use, and integration with source control
systems. Which one would you prefer for a containerized microservices project, and why?
Jenkins uses Groovy-based Jenkinsfile configurations and offers a highly flexible plugin
ecosystem, but typically requires additional setup and maintenance. In contrast, GitHub
Actions uses YAML-based configuration and integrates directly with GitHub repositories,
offering a more streamlined developer experience.
For containerized microservices, GitHub Actions is often preferred due to its native support for
Docker workflows, seamless integration with GitHub, and built-in tools for managing secrets,
artifacts, and caching. Its simplicity and cloud-based execution model make it especially
suitable for modern DevOps pipelines.
2. Using a GitOps tool such as Argo CD or Flux, manually modify a deployment in a Kubernetes
cluster and observe the behavior. What action does the GitOps controller take, and why?
When a deployment managed by Argo CD or Flux is manually altered, such as by changing the
number of replicas or modifying the container image, the controller detects that the live cluster
state no longer matches the desired state stored in the Git repository. The GitOps tool reacts by
automatically reverting the changes to restore the declared configuration.
This action demonstrates the reconciliation loop, a foundational principle of GitOps. The
system continuously ensures consistency by enforcing that the actual infrastructure state
aligns with the version-controlled source of truth, enabling self-healing, predictability, and
operational safety.

### 701.5 Software Composition, Licensing and Open Source
DevOps Tools Engineer v2.0, Exam 701, Objective 701.5
- Understand how an application is build out of multiple software components
- Awareness of dependency managers like NPM, gradle or composer
- Understand the concepts proprietary and open source software
- Understand the concepts of open source software licenses
- Awareness of commonly used open source licenses (GPL, LGPL, AGPL, BSD, MIT and Apache
License)
- Awareness of license compatibility and multi licensing
- Software libraries
- Software Bill Of Materials
- Proprietary software
- Open Source Software and Free Software
- Copyleft open source software licenses
- Permissive open source software licenses

### 701.5 Software Composition, Licensing and
Open Source

Modern software development is highly modular. Instead of writing everything from the ground
up, developers rely on a rich ecosystem of software components, including third-party libraries,
frameworks, and tools. These components can come from different sources. Some are proprietary,
while others are open source. Understanding how an application is assembled from these various
parts is essential not only for building efficient systems but also for managing legal, security, and
operational aspects of the software.
In this lesson, the fundamental distinctions between proprietary software and open source
software are examined, emphasizing how the principles of freedom, transparency, and
collaboration have shaped modern software development practices. A central theme is open
source licensing, covering widely used licenses. The concepts of copyleft and permissive licensing,
license compatibility, and multi-licensing are analyzed to illustrate how legal frameworks

influence project integration and redistribution. Understanding these principles is essential when
combining different licensed components within a single codebase.
The lesson also introduces modern dependency managers — including NPM, Gradle, and
Composer — which automate the retrieval and management of external libraries. As software
systems grow in complexity, maintaining awareness of all dependencies becomes critical for
ensuring not only functionality but also compliance and security. This leads to the concept of a
software bill of materials (SBOM), a comprehensive inventory of all components, libraries, and
dependencies that make up an application.

How an Application is Built Out of Multiple Software
Components
Modern applications are rarely monolithic. Instead, they are constructed by combining multiple
software components, each designed to handle particular functions. This modular approach
allows for greater scalability, maintainability, and flexibility during development and operations.
Each application integrates various layers and services. These components may be developed in
different programming languages, maintained in separate repositories, or even run in separate
environments such as containers, virtual machines, or serverless runtimes.
Rather than being built entirely from scratch, today’s software systems are typically assembled
from a collection of interoperable components and services that collaborate to deliver complete
functionality. These components include:
Front end
This is the user interface (UI) layer, responsible for what users see and interact with. It is often
built using frameworks like React or Angular, providing dynamic and responsive experiences
across devices.
Back end
The back end handles the server-side logic of the application. It processes business rules,
manages databases, and exposes APIs that are used by the front end or other parts of the back
end. Common backend frameworks include Flask, Express.js, NestJS, and Symfony.
Libraries and frameworks
These are reusable code modules that simplify the development process by providing prebuilt
functionality for common tasks, such as authentication, input validation, and logging.

Middleware
Acting as the bridge between the front end and back end, middleware includes API gateways,
authentication layers, and message brokers that facilitate communication and control the flow
of data.
Databases
These systems store and serve up persistent data. Popular database technologies include
MySQL, PostgreSQL, and MongoDB, each suited for different use cases and data models.
Third-party services
Many applications call upon external services to extend functionality, such as payment
gateways (e.g., Stripe, PayPal), cloud storage (e.g., AWS S3), and email delivery platforms.
This component-based design is a key principle behind microservices architectures, which divide
an application into small, autonomous services that communicate over APIs. Even in more
traditional monolithic applications, modularization is encouraged through layered design (e.g.,
separating the presentation, business logic, and data access layers).
Managing such complexity requires thoughtful architectural planning, dependency management,
testing, and automation. It also introduces the need for effective integration strategies, CI/CD
pipelines, and monitoring solutions that can observe and correlate the behavior of these
interconnected components.

The Effect of Software Licensing on Application
Development
When an application is composed of multiple components, each provided by a different vendor,
open source community, or internal team, licensing becomes critical. Every software library,
framework, or service integrated into the system might be governed by a distinct license.
Some licenses impose minimal restrictions, while others require derivative works to be released
as free and open source. As a result, developers and system architects must consider not only
components' technical compatibilities but their legal impacts. Developers need to ensure that the
combination of licenses is legally compatible with the intended distribution model for the
software, whether it is delivered as a commercial product, a cloud service, or a private internal
tool.
When using third-party components, therefore, understanding their licenses is crucial for
ensuring compliance, avoiding legal risks, and upholding the trust and obligations associated with
using third-party code.

Proprietary and Open Source Software
Software can generally be divided into two main categories: proprietary software and open source
software (OSS).
Proprietary software (or closed source software) is developed and owned by a company or
individual, and its source code is usually kept confidential. Users are granted the right to use the
software by purchasing a license, but they are not allowed to view, modify, or redistribute the
underlying code. This type of software is typically distributed in binary form only, and its usage is
strictly controlled by an end-user license agreement (EULA). Common examples of proprietary
software include Microsoft Office, Adobe Photoshop, and Oracle Database. This type of software
restricts user freedom when it comes to customization, redistribution, or access to the source
code.
On the other hand, open source software (OSS) is distributed under licenses that make its source
code publicly available. The licenses allow for more than inspection: anyone can modify and
share the software, provided they comply with the terms of its open source license. OSS
encourages transparency, collaboration, and community-driven development, which often lead to
faster innovation and improved responsiveness to user needs. Notable examples of open source
projects include the Linux operating system, the Kubernetes container orchestration platform,
and the TensorFlow machine learning framework. These tools are maintained by global
communities of developers and are widely adopted in both academic and commercial

Open Source Software and Free Software
Although the terms open source software and free software are often used interchangeably, they
reflect distinct philosophies with nuanced differences.
Free software is rooted in the idea of user freedom. Championed by the Free Software Foundation
(FSF), this approach guarantees four fundamental freedoms: the freedom to run the software for
any purpose, to study how it works, to modify it, and to share it with others. The emphasis here is
ethical and ideological, focusing on user rights and autonomy over the software they use.
Although in practice open source software offers the same benefits, the term places more
emphasis on the practical and collaborative aspects of software development. Promoted by the
Open Source Initiative (OSI), this model encourages transparency, peer review, and distributed
innovation. The focus is less on freedom and more on the technical and organizational benefits of
making source code publicly accessible.
Software that qualifies as free software also qualifies as open source — but not always vice versa.

Different licenses are not always compatible, as the next sections explain.

Open Source Software Licenses
Open source software licenses grant users specific rights to use, modify, and distribute software,
but the extent of these rights can vary depending on the type of license. Broadly speaking, open
source licenses fall into two main categories: copyleft and permissive.

Copyleft Licenses
Copyleft licenses are designed to preserve the freedom and openness of software by requiring that
any derivative works or modified versions be distributed under the same license terms. This
means that anyone who alters the software must also make their changes available under an open
source license, ensuring that the code — and any improvements made to it — remains freely
accessible to the community.
The GNU General Public License (GPL), created by the Free Software Foundation, is one of the most
influential and widely used licenses in the free and open source world. The GPL is known as a
strong copyleft license, meaning that any derivative work — including software that incorporates
or is based on GPL-licensed code — must also be released under the GPL. This ensures that the
freedoms to use, study, modify, and redistribute the software are preserved in all modified
versions. For example, if a developer uses a GPL-licensed module to perform calculations in their
application, and then distributes their application to others, they must release the entire
application under the GPL.
The GNU Affero General Public License (AGPL) is an extension of the GPL designed specifically for
network-based software such as web applications and software as a service (SaaS). While the GPL
applies only when the software is distributed, the AGPL adds an additional requirement: if users
interact with the modified software over a network, the source code must be made available to
them. This closes the “ASP loophole” that allowed companies to use modified open source
software on their servers without sharing their changes, since no actual distribution was taking
place. With the AGPL, even software used privately on servers must share its code if it is accessed
by users remotely.
The GNU Lesser General Public License (LGPL) offers a more permissive alternative to the GPL. It is
designed for software libraries, allowing them to be used within proprietary applications without
forcing the entire application to adopt the LGPL. This makes it attractive to commercial
developers who want to use open source libraries while keeping their core application code
closed. However, any modifications to the LGPL-covered library itself must still be made available
under the same license. For example, a company can use an LGPL-licensed graphics engine within
a closed-source game, as long as they don’t modify the engine. If they make enhancements to the

code of the engine itself, they must release the modified engine under the LGPL, but they still
don’t have to release the game under that license.

Permissive Licenses
In contrast, permissive licenses offer much greater flexibility. While they still allow users to view,
modify, and distribute the code, they do not require derivative works to be released under the
same license. This means that developers can incorporate open source code into proprietary or
closed-source projects without the obligation to open their own code. Software released under
permissive licenses is frequently used in both open source and proprietary projects, allowing
maximum flexibility for developers and organizations.
The MIT License is one of the most popular and widely adopted permissive open source licenses.
Its appeal lies in its simplicity and flexibility. It allows anyone to use, copy, modify, merge,
publish, distribute, sublicense, or sell the software with very few restrictions. The only
requirement is to include the original license notice and copyright statement in all copies or
substantial portions of the software. Well-known projects such as React and Node.js use the MIT
License.
The Berkeley Software Distribution (BSD) License is another classic permissive license, originating
from the Unix-based BSD operating system. Like the MIT License, this license imposes minimal
restrictions on the use and redistribution of the software. There are several variants of the BSD
license (such as 2-Clause and 3-Clause), but all share the same goal: to encourage broad adoption
of software while requiring only basic attribution and disclaimers. The BSD License is known for
being business-friendly and legally straightforward, making it a favorite in academic and
corporate environments.
The Apache License 2.0 is also permissive but includes additional explicit terms regarding patent
rights and contributor agreements, which provide legal protection for users and contributors. This
makes it particularly attractive for enterprise and commercial use. Unlike the MIT or BSD licenses,
the Apache License ensures that users receive a grant of patent rights, preventing contributors
from later suing users for patent infringement. It also requires modifications to be clearly marked,
which improves transparency when sharing code. Major projects like Apache Kafka, Hadoop, and
Android use the Apache License 2.0 due to its robust legal framework.
In essence, the key difference lies in how the licenses handle redistribution and modification:
copyleft licenses enforce freedom and openness across all derived versions, while permissive
licenses allow for more leeway in how the code is reused, including in proprietary software.

License Compatibility and Multi-Licensing
License compatibility is a crucial consideration in open source development, because not all
licenses can be combined freely. Some licenses include terms that conflict with those of others,
making it legally problematic to mix code governed by different licensing models. A common
example is the incompatibility between the GPL and permissive licenses like the MIT License.
Since the GPL imposes strict copyleft requirements, integrating GPL-licensed code into a project
under a permissive license would violate the GPL’s terms.
To address different user needs and scenarios, some projects adopt a strategy known as multilicensing. This approach allows the same software to be distributed under multiple licenses. For
instance, a database might be made available under the GPL for open source use, while also
offering a separate commercial license for proprietary applications. This enables broader
adoption while maintaining compliance with open source principles. Multi-licensing also allows a
developer to make some money off of the software while also providing it to non-commercial
development projects without cost.

Dependencies and Package Management
Dependencies are external libraries or tools that an application relies on to function correctly.
Managing these dependencies effectively is crucial not only for maintainability but also for
ensuring the security and stability of software.
To simplify this process, developers use dependency managers — tools that automate the
download, installation, and updates of required libraries. Each programming ecosystem typically
has its own preferred manager. For instance, JavaScript and Node.js projects commonly use NPM
(Node Package Manager), while Pip is widely used in Python environments. In the Java world, both
Maven and Gradle are popular choices, with Gradle being especially favored for Kotlin projects.
PHP developers often rely on Composer to handle package management.
These tools work by reading configuration files specific to each ecosystem. For instance, NPM
consults a package.json file, while Gradle looks for a build.gradle file. The configuration file
defines the required dependencies and their versions. Based on this configuration, the
dependency manager fetches the appropriate packages from online repositories, ensuring that all
required components are present and correctly versioned.
By streamlining dependency management, these tools help developers avoid the pitfalls of manual
installation, including version conflicts and inconsistent environments across development,
testing, and production systems.

Software Libraries
Libraries are reusable pieces of code that provide functions for a specific purpose such as
mathematical calculation or handling web requests. Libraries allow developers to integrate
complex features into their applications without having to build everything from scratch. They
are designed to solve common problems or offer standardized solutions across different projects
and languages.
For example, in the context of logging, Java developers often use Log4j, while Winston is a popular
choice in the Node.js ecosystem. When it comes to authentication, Node.js uses the Passport.js
library and Java often uses Spring Security to simplify the implementation of secure login and
access control. In the area of testing, tools such as JUnit for Java and Jest for JavaScript help
automate the validation of code, making it easier to ensure reliability and correctness.
Relying on well-maintained libraries not only accelerates development but also reduces the
likelihood of bugs and security issues, because these libraries are often tested and reviewed by
large communities. This promotes code quality, consistency, and long-term maintainability.

Software Bill of Materials
A software bill of materials (SBOM) is a comprehensive inventory that lists all the components,
dependencies, and licenses included in a software application. Much like a bill of materials in
manufacturing, an SBOM provides visibility into the inner structure of the software, detailing
exactly what it is made of.
This level of transparency is becoming increasingly critical for several reasons. From a security
perspective, SBOMs allow organizations to identify and track vulnerable components within their
codebase, making it easier to respond quickly to threats. In terms of compliance, they help ensure
that all included libraries and tools are used in accordance with their respective licenses, reducing
the risk of legal issues. Furthermore, SBOMs enhance supply chain transparency, allowing teams
to trace the origin and integrity of each component, an essential capability in a world of growing
software interdependencies.
To help generate and maintain SBOMs, various tools have been developed, including SPDX,
CycloneDX, and Syft. These tools automate the process of scanning applications and producing
standardized SBOM documents. As a result, many organizations are incorporating SBOMs into
their DevSecOps workflows, making them a key element of modern secure software development
practices.

## 1. What is the difference between open source software and free software in terms of philosophy
and goals?

2. Explain the main difference between copyleft and permissive open source licenses.

## 3. Why must developers consider software licensing when assembling an application from
multiple components?

## 4. If a developer uses a GPL-licensed library as part of a new software application, under what
conditions must the new software also be licensed under the GPL?

## 5. What is the role of a Software Bill of Materials (SBOM), and why is it increasingly important in
modern software development?

## 1. Research a real-world software project that is licensed under the GNU General Public License
(GPL). Identify how its licensing terms influence the way it can be used or integrated into other
applications. Consider the following: Has the project been incorporated into other software? If
so, how did the developers comply with the GPL terms? If not, are there any known examples
where the GPL license created legal or practical challenges?

Modern applications are rarely built from scratch. They are composed of multiple software
components, often combining original code with third-party libraries and frameworks.
Understanding how these components come together is essential for developers and system
administrators alike. This lesson explored the difference between proprietary and open source
software, and how each plays a role in modern software development.
The lesson also dived into the world of software licensing, presenting widely used open source
licenses such as GPL, MIT, Apache, and others. The lesson covered key distinctions between
copyleft and permissive licenses, and introduced important concepts such as license compatibility
and multi-licensing. It introduced dependency managers such as NPM, Gradle, and Composer, and
how to track components through a software bill of materials (SBOM) — a crucial practice for
ensuring security and compliance in software projects.

## 1. What is the difference between open source software and free software in terms of philosophy
and goals?
Open source software emphasizes transparency, collaboration, and innovation. Its focus is on
practical development benefits like peer review and rapid evolution of code. Free software, on
the other hand, is grounded in the philosophy of user freedom. Promoted by the Free Software
Foundation, it upholds ethical rights such as the freedom to run, study, modify, and share
software. While both promote access to source code, free software is more ideologically driven,
whereas open source prioritizes technical and collaborative advantages.
2. Explain the main difference between copyleft and permissive open source licenses.
Copyleft licenses, such as the GNU GPL and AGPL, require any derivative works to be released
under the same license, preserving the open nature of the code. This means that if a developer
modifies GPL-licensed software and distributes it, the entire modified version must also be free
and open source. Permissive licenses, like MIT, BSD, and Apache 2.0, allow more flexibility;
developers can incorporate the code into proprietary software without having to disclose their
source code, provided they meet basic attribution requirements.
3. Why must developers consider software licensing when assembling an application from
multiple components?
Developers must consider licensing because each component in a software project may be
governed by different legal terms. Ignoring license compatibility can lead to violations,
especially when combining code with conflicting requirements. For example, integrating a
GPL-licensed library into a proprietary application could force the entire project to be released
as free software under the GPL, which might not align with business goals. Understanding and
managing these licenses ensures legal compliance and avoids unintended exposure of source
code or trade secrets.
4. If a developer uses a GPL-licensed library as part of a new software application, under what
conditions must the new software also be licensed under the GPL?
If the GPL-licensed library is linked to or incorporated into the new application in a way that
creates a derivative work, and if the work is distributed, the entire software must be released
under the GPL. This means the developer must make the source code available under the same
GPL license and grant users the same freedoms defined by the GPL. The GPL enforces this to
ensure that software derived from GPL code remains free and open. Simply using a GPL tool
externally (like running a script that invokes a GPL program) does not trigger this requirement.

Using the derivative software solely within the organization that developed the application is
also exempt from releasing the software under the GPL.
5. What is the role of a Software Bill of Materials (SBOM), and why is it increasingly important in
modern software development?
An SBOM is an inventory that lists all the components, dependencies, and licenses within a
software application. It provides transparency into the structure of the software, helping teams
identify security vulnerabilities, ensure license compliance, and enhance supply chain
visibility. As applications become more modular and depend more heavily on third-party
components, SBOMs are essential for managing risk, maintaining trust, and supporting secure
development practices.

## 1. Research a real-world software project that is licensed under the GNU General Public License
(GPL). Identify how its licensing terms influence the way it can be used or integrated into other
applications. Consider the following: Has the project been incorporated into other software? If
so, how did the developers comply with the GPL terms? If not, are there any known examples
where the GPL license created legal or practical challenges?
An example could be VLC Media Player, which is licensed under the GPL. Because of its license,
it cannot be legally bundled with software that is proprietary or distributed under an
incompatible license, such as some versions of Apple’s App Store policies. As a result, VLC has
faced challenges distributing its app through certain platforms. Developers who wish to use
VLC’s libraries must also release their software under the GPL, ensuring that the resulting work
remains open source. This reinforces the GPL’s intention to keep derivative software free and
transparent.

DevOps Tools Engineer (Version 2.0) |

## Topic 702: Application Container

### 702.1 Application Container Management
DevOps Tools Engineer v2.0, Exam 701, Objective 702.1
- Understand the Docker and Podman architecture
- Use existing images from an OCI registry
- Operate and access containers
- Understand Docker networking concepts, including overlay networks
- Understand the concepts of DNS service discovery
- Connect container to container networks and use DNS for service discovery
- Understand Docker storage concepts
- Use Docker volumes for shared and persistent container storage
- Awareness of rootless containers
- docker container *
- docker network *
- docker image *
- docker volume *
- podman container *

- podman network *
- podman image *
- podman volume *

### 702.1 Application Container Management

Containers have revolutionized the development, testing, and deployment of applications. By
providing a lightweight and portable runtime environment, containers have become foundational
to modern DevOps and cloud-native development. Among the most widely used tools in the
container ecosystem are Docker and Podman. This lesson provides an in-depth exploration of
their architectures, core components, and operational principles. A detailed comparison
highlights how Docker relies on a centralized daemon to manage containers, while Podman
operates in a daemonless and rootless architecture, offering enhanced security and better
integration with systemd.
The lesson also discusses container image formats, networking models, and storage mechanisms
shared between the two tools, emphasizing their interoperability through the Open Container
Initiative (OCI) standards.

Foundations of Containerization
Before diving into Docker and Podman, it is essential to grasp the fundamental concept of
containerization, which lies at the heart of modern application development and deployment.

At its core, a container is a lightweight, portable unit that encapsulates an application together
with everything it needs to run. The contents of a container include its runtime environment,
configuration files, system tools, libraries, and dependencies. This packaging ensures that the
application can run reliably and consistently across different computing environments, whether it
is on a developer’s local machine, a test environment, or a production server in the cloud.
One of the primary motivations for using containers is to solve the age-old challenge of
environmental inconsistencies — the infamous “it works on my machine” problem. By
standardizing the runtime environment, containers remove the dependency on underlying host
configurations and eliminate surprises during deployment.
Containers differ significantly from traditional virtual machines (VMs). While VMs emulate entire
operating systems along with hardware layers — which can lead to increased resource usage and
slower startup times — containers share the host operating system’s kernel, making them much
more lightweight and efficient. This means multiple containers can run simultaneously on a single
host without the overhead of multiple full OS instances.
Containers achieve isolation and resource control, without the overhead of virtual machines, by
exploiting two key features provided by the Linux kernel: namespaces and control groups
(cgroups). These are the foundational building blocks that enable containers to behave like
isolated systems while sharing the same operating system kernel.

Docker and Podman Architecture
Before focusing on hands-on usage, you should understand how Docker and Podman are
structured internally. While both tools serve the same purpose — managing and running
containers — their architectures reflect different design philosophies, especially around security,
use of background services, and root privileges.
Both Docker and Podman adhere to the specifications defined by the Open Container Initiative
(OCI), an industry standard for container image formats and runtimes. This compliance ensures
that images built with Docker can be run by Podman, and vice versa, with full interoperability.
Podman uses the same low-level runtime (runc) as Docker under the hood and can work with
OCI-formatted images, making it a drop-in replacement in many use cases — especially in CI/CD
pipelines, Kubernetes workflows, and developer machines.

Docker Architecture
Docker, launched in 2013, revolutionized containerization by making it accessible, portable, and
easy to use. It simplified existing Linux container technologies with a user-friendly toolchain and
standard image format, enabling developers to package applications and their dependencies into

portable units. Docker quickly became the de facto standard for containerized development in the
open source community.
Docker follows a client-server model, which separates the user interface (client) from the
background process (server) that performs container-related operations. This architectural design
allows Docker to handle complex tasks in the background while exposing a simple and intuitive
interface for developers. The key components in this model are:
Docker daemon (dockerd)
The daemon is the core service of Docker, running in the background on the host system. It is
responsible for creating, running, and managing Docker objects such as containers, images,
volumes, and networks. The daemon exposes a REST API, which the Docker client uses to send
commands. Since the daemon typically runs with root (superuser) privileges, it has full control
over system resources, which enables powerful operations. But root access also introduces
potential security risks if the daemon is not properly isolated or protected.
Docker client (docker)
This is the command-line interface (CLI) that users interact with. Commands like docker run,
docker build, and docker ps are issued through the CLI, which then communicates with the
Docker daemon over the REST API (usually via a Unix socket). The CLI simplifies user
interaction by abstracting low-level details, allowing developers to manage containers and
images efficiently.
Container registries
Docker utilizes registries to store and distribute container images. These registries act as central
repositories to which images are pushed after being built and then pulled to run containers. The
most widely used public registry is Docker Hub, which hosts thousands of official and
community-contributed images. Organizations can also host private registries to manage
internal container assets securely.
Container runtime
At the lowest level, Docker relies on a container runtime to actually start and stop containers.
Initially, Docker used its own monolithic engine, but over time, it adopted a modular approach.
Today, Docker uses containerd as its container management engine and runc as the low-level
runtime that interacts with the Linux kernel. These runtimes make use of kernel features such
as namespaces (for process isolation) and control groups or cgroups (for resource limits) to
provide a secure and efficient environment for each container instance.

Podman Architecture
Podman, released in 2018 by the libpod project under Red Hat, was designed as a secure,
daemonless alternative to Docker. It allows containers to run as non-root user processes,
enhancing security in multi-user environments. Fully OCI-compliant, Podman supports Docker
images and runtimes, making it a drop-in replacement for Docker that preserves existing
workflows while offering improved security and control. Features include:
Daemonless operation
One of the most significant differences between Podman and Docker is that Podman does not
require a persistent background service (daemon) running as root. Every container-related
command in Podman — such as running, building, or inspecting a container — is executed as
an independent process. This eliminates the need for a central service with elevated privileges
continuously running in the background. Podman’s architecture enhances transparency,
auditability, and security. It also means that each container is spawned directly by the user
process, making it easier to trace and manage using standard Linux tools like ps, top, or kill.
Rootless containers
Podman also lets non-root users run containers, a feature known as rootless mode. This
minimizes the risk of privilege escalation attacks, because the user operating the container
does not require administrative access to the host system.
Pods
These are groups of one or more containers that share the same network namespace. This
design mirrors the pod concept in Kubernetes, making Podman a suitable tool for developing
and testing applications intended for Kubernetes deployments.

Using Existing Images from an OCI Registry
Container images are at the core of how containers work. An image is a lightweight, standalone,
executable package that includes everything needed to run a piece of software — including the
code, runtime, libraries, environment variables, and configuration files.
Container images are composed of multiple read-only layers. Each layer represents a step in the
image’s build process, such as installing dependencies or copying application files. These layers
are stacked on top of each other and shared across images to save disk space and improve
efficiency.
Using existing images from an OCI-compliant registry is a core part of working with containerized
environments. Both Docker and Podman can pull, run, and manage container images from
registries such as Docker Hub, Quay.io, GitHub Container Registry, and Google Container

Registry — basically, any registry that adheres to the OCI standard.

Pulling an Image from an OCI Registry
Images are retrieved using the pull subcommand. This downloads the image and its layers to
your local system so it can be used to start containers.
The following examples show how to use an image from a remote registry. Because Podman offers
full command-line compatibility with Docker, it is unnecessary to provide separate examples for
each. All docker commands and options work identically with podman.
A practical approach to ensure compatibility when running existing scripts is to define a shell
alias that redirects Docker commands to Podman:
$ alias docker=podman

This simple alias allows any script or command written for Docker to run seamlessly with
Podman, without requiring modifications.
$ docker pull nginx:latest

In this example, nginx is the image name and latest is the tag. Tags are used to assign versions
to images. If no tag is specified, the most recently built image (latest) is assumed by default. If
the image isn’t found locally, Docker or Podman will look it up in the default registry (usually
Docker Hub unless configured otherwise).
You can also specify full image paths:
$ docker pull quay.io/<username>/myimage:1.0

Listing Local Images
After pulling images, the locally available container images can be listed using:
$ docker images

Authentication and Private Registries
When pulling images from a private registry, authentication may be required. Use the following
command to log in with valid credentials:
$ docker login registry.example.com

This stores your credentials securely and allows access to protected images.

Operating and Accessing Containers
Containers are running instances of images. They transform the static definition of an image into
a live, executable environment where applications actually run.
An image serves as a blueprint, while a container represents the realized instance of that
blueprint in action. Whereas an image is immutable and read-only, a container is dynamic — it
executes the packaged code along with its dependencies, configuration, and runtime context.
Once launched, a container operates as an isolated process on the host system, complete with its
own filesystem, network stack, and process space, ensuring reproducibility and separation
between applications.
The following subsections present the most common container management operations,
illustrating how to start, inspect, stop, and remove containers effectively.

Running a Container
After pulling an image from a registry, the next step is to run a container derived from that image.
This action launches an isolated environment in which the application executes, using the
configuration and dependencies defined by the image. The basic syntax is:
$ docker run [options] <image-name>:<tag>

By default, this command:
- Pulls the image if it is not already available locally.
- Creates a new container from that image.
- Runs the container in the foreground (blocking the terminal).
- Uses default settings (no port mapping, no volume, no name, etc.).

Options can control the run:
$ docker run -d --name webserver -p 8080:80 -v /app/html:/var/www/html nginx:latest

This command:
- Runs the nginx container in the background (-d).
- Names it webserver.
- Maps the local machine’s port 8080 to the container’s port 80 using the -p option.
- Mounts the host directory /app/html to the container’s mount point /var/www/html using the
-v option.

Running a Container in Interactive Mode
Interactive mode enables direct interaction with a container’s shell in real time, similar to
working in a standard Linux terminal session. This mode is particularly useful for debugging,
inspecting the container’s environment, or executing commands manually within the container.
To start a container in interactive mode, use the -it option, where:
-i
keeps the standard input (stdin) open, allowing real-time user interaction.
-t
allocates a pseudo-terminal (TTY), providing a terminal interface for command-line access.
Examples:
$ docker run -it ubuntu /bin/bash

In the ubuntu image, /bin/bash is included by default, offering a complete Bash shell
environment.
In contrast, the lightweight alpine image does not include Bash; instead, it provides /bin/sh, a
minimal shell suitable for basic command execution and scripting.
To terminate the interactive container, simply type:

Accessing a Running Container
Occasionally, it becomes necessary to interact with a container that is already running — for
example, to inspect files, troubleshoot issues, or execute additional commands within the
container environment.
The exec command allows the execution of a new process inside an active container without
restarting it:
$ docker exec -it webserver /bin/bash

The Docker example accesses a container named webserver using the Bash shell.
Why use exec instead of run?
docker run
starts a new container.
docker exec
runs a command inside an existing container.
The exec command should be used when a container is already running and there is no need to
restart it or create a new one. It provides a convenient way to access the container’s environment,
inspect its state, or execute maintenance and diagnostic commands without disrupting its
operation.

Listing Running Containers
After launching one or more containers, it is often useful to verify which containers are currently
active on the system.
$ docker ps
CONTAINER ID

COMMAND

CREATED

"/docker-entry…"

2 minutes ago

Up 2 minutes

0.0.0.0:8080-

NAMES
a1b2c3d4e5f6
>80/tcp

webserver

This command lists all active containers and provides detailed information about their current
state and configuration:

CONTAINER ID
The unique identifier assigned to each container. This is typically a shortened version of a
longer SHA256 hash and can be used in other commands such as docker stop, podman logs,
or docker inspect.
The name of the image used to create the container, often including a tag (for example,
:latest or :v1.2) to indicate the version.
COMMAND
Displays the entry point command executed when the container started.
CREATED
Indicates how long ago the container was created or started.
Shows the current container state — for example, Up, Exited, Paused, or Restarting.
Lists the network ports exposed by the container and their corresponding mappings on the
host machine, shown as <host_port>:<container_port>.
NAMES
The human-readable name assigned automatically by Docker or Podman, unless explicitly set
with the --name option.
To view all containers — both running and stopped — include the -a option:
$ docker ps -a

This extended listing is useful for reviewing past container runs, debugging issues, or cleaning up
unused containers.

Creating a Container
The create command in both Docker and Podman creates a new container but does not start it
automatically. This is particularly useful when a container needs to be prepared with specific
configurations — such as environment variables, mounted volumes, or port mappings — before
execution.

By separating creation from startup, this approach allows fine-tuning and inspection of container
settings prior to running it.
$ docker create --name mynginx -p 8080:80 nginx
624840fa77280c6ddbad6f7b0cb69d020d5a984d1ba16018480d373cde1d9411

The command output shows the full contained ID.
The run command shown earlier is a shortcut that combines create and start.

Managing a Container’s Lifecycle
After a container has been created, its execution can be managed using the start, stop, restart,
and rm commands available in both Docker and Podman. These commands control the lifecycle of
a container, allowing it to be started, stopped, restarted, or removed without the need to recreate
it.
Containers can be referenced by their name, their full container ID, or a shortened version of that
ID. This flexibility simplifies day-to-day management tasks and supports both manual
administration and automated scripts.
The following commands are used to manage the lifecycle of containers, providing control over
their execution, termination, and removal as needed:
start
Launches a container that was previously created or stopped, resuming its execution without
altering its configuration.
stop
Gracefully terminates a running container, allowing applications to shut down cleanly before
the process is halted.
restart
Stops and then starts the container again — a convenient way to apply changes, refresh
configurations, or recover from transient errors.
rm
Deletes containers that are no longer running. To also remove any associated anonymous
volumes, use the -v or --volumes option.
These commands operate on containers that have already been configured and created, providing

precise control over when and how containers are executed, paused, or removed — without losing
their established setup or configurations.

Viewing Detailed Container Information With inspect
The inspect command returns low-level JSON metadata about a container, image, volume, or
network. It is useful for examining configuration, networking, mount points, environment
variables, IP addresses, and more:
$ docker inspect <container-name-or-id>

This command outputs a large JSON object; specific fields can be filtered by using tools such as jq,
or by adding the --format option:
$ docker inspect --format '{{.NetworkSettings.IPAddress}}' mynginx

Podman uses a different data structure than Docker for network information. As a result, the
.NetworkSettings.IPAddress field is not available. Instead, use the following command to
retrieve the container’s IP address:
$ podman inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mynginx

Viewing Container Output With logs
The logs command displays the standard output (stdout) and standard error (stderr) streams of a
container, whether it is currently running or has already stopped. This command is essential for
diagnosing issues, especially when containers terminate unexpectedly or produce no visible
output:
$ docker logs mynginx

Additional options enhance log viewing flexibility:
-f (“follow”)
Continuously streams the container’s logs in real time, similar to tail -f.
--since and --until
Filter logs within a specific time range.

--tail n
Displays only the last n lines of the log output.
Example:
$ docker logs -f --tail 50 mynginx

1. What is the primary difference between a Docker container and a virtual machine (VM)?

2. How do you view all containers, including stopped ones, in Docker?

3. What is the purpose of the docker exec or podman exec command?

4. What is the difference between docker run and docker create?

## 5. You’ve launched a container called my-nginx using either Docker or Podman. How do you find
out the container’s internal IP address, so that you can use it for service discovery or testing
within a custom network?

1. Containers use Linux kernel features such as cgroups to control and limit resource usage.
Research and answer the following:
- What are control groups (cgroups) in Linux and how do they relate to containerization?

- Using either Docker or Podman, how can you confirm that a running container is being
limited or tracked using cgroups?

2. What are the default logging drivers used by Docker and Podman?

3. How can you change or configure a different logging driver for a specific container?

## 4. You have created a bridge network named isolated_network on two separate Docker nodes
using the command:
$ docker network create --driver bridge isolated_network

Then you started one container on each node using --network=isolated_network. However,
the containers are unable to communicate with each other. What needs to be done to allow
these containers to interact across nodes?

This lesson explained why containers are the environment of choice for developing modern,
modularized applications and for running them in production. It described how the popular
Docker and Podman tools create and manage images, which are the templates for creating
containers, and the differences between Docker and Podman. The lesson ended with the most
common commands for creating, interacting with, and viewing information about containers.

1. What is the primary difference between a Docker container and a virtual machine (VM)?
Docker containers share the host OS kernel and are more lightweight, while VMs emulate an
entire OS and hardware environment.
2. How do you view all containers, including stopped ones, in Docker?
Use the docker ps -a command.
3. What is the purpose of the docker exec or podman exec command?
It runs a command inside an already running container.
4. What is the difference between docker run and docker create?
docker run creates and starts a container, whereas docker create only creates the
container without starting it.
5. You’ve launched a container called my-nginx using either Docker or Podman. How do you find
out the container’s internal IP address, so that you can use it for service discovery or testing
within a custom network?
Use the inspect command to retrieve the IP address:
docker inspect --format '{{ .NetworkSettings.IPAddress }}' my-nginx

or
podman inspect --format '{{ .NetworkSettings.IPAddress }}' my-nginx

1. Containers use Linux kernel features such as cgroups to control and limit resource usage.
Research and answer the following:
- What are control groups (cgroups) in Linux and how do they relate to containerization?
Control groups (cgroups) are a Linux kernel feature that allows administrators to group
processes and to measure, limit, or isolate their system resources (such as CPU, memory,
block I/O, and network). In the context of containers, cgroups ensure that containers do not
exceed specified resource quotas and do not affect each other’s performance on the same
host.
- Using either Docker or Podman, how can you confirm that a running container is being
limited or tracked using cgroups?
Use the inspect command to locate the container’s ID or cgroup path:
$ docker inspect --format '{{.Id}}' my-container

Then check cgroup usage from the host:
$ cat /sys/fs/cgroup/memory/docker/<container-id>/memory.limit_in_bytes

Alternatively, use a container stats command:
$ docker stats

## 2. What are the default logging drivers used by Docker and Podman?
By default, Docker uses the json-file logging driver, which stores logs as JSON-formatted files
on disk. Podman typically uses the k8s-file or journald logging drivers, depending on
system configuration and installation.
3. How can you change or configure a different logging driver for a specific container?
To configure a different logging driver when starting a container, use the --log-driver
option:

$ docker run --log-driver=syslog nginx

## 4. You have created a bridge network named isolated_network on two separate Docker nodes
using the command:
$ docker network create --driver bridge isolated_network

Then you started one container on each node using --network=isolated_network. However,
the containers are unable to communicate with each other. What needs to be done to allow
these containers to interact across nodes?
To enable communication between containers running on different Docker nodes, you need to
use an overlay network instead of a bridge network. The bridge driver supports container
communication only within the same host. Overlay networks, on the other hand, are designed
for multihost networking and allow containers to communicate across nodes in a Docker
Swarm or similar clustered environment.

### 702.1 Application Container Management

This lesson introduces the foundational concepts of networking, storage, and rootless
containers — three core elements for building secure, reliable, and scalable container
infrastructures. It examines how Docker manages networking, explaining how containers connect
to one another and how DNS-based service discovery enables containers to locate services by
name. It also discusses how containers can be attached to custom user-defined networks and how
overlay networks operate in distributed, multi-host environments.
The lesson then focuses on Docker storage, describing how containers handle data persistence and
how volumes offer a consistent and secure mechanism for sharing and storing data between
containers and the host system. It concludes with the concept of rootless containers — an
execution model that allows containers to run without requiring root (superuser) privileges.
Rootless execution enhances security, particularly in shared environments or when handling
untrusted workloads.
All concepts, commands, and configurations described in this lesson apply equally to both Docker
and Podman. Both tools share the same command-line syntax and operational principles, and any
example shown for Docker can be executed identically with Podman.

Docker Networking
In containerized environments, networking is a critical component of how containers
communicate with other containers and services, whether inside the same host, across multiple
hosts, or with the outside world. Docker provides a powerful, pluggable networking model that
allows containers to be connected in flexible ways while maintaining isolation and security.
Docker offers several network drivers, each designed for specific use cases. These drivers include
bridge, host, none, overlay, and macvlan. Each container is assigned its own network
namespace, including a unique IP address, routing table, and network interfaces.
When a container is started, it can be attached to one or more of these networks using the
--network option. This controls how the container interacts with other containers and external
systems.

Bridge Network (Default)
The bridge network is Docker’s default network driver for standalone containers. It creates a
private virtual network on the host, allowing containers on the same bridge to communicate with
each other using their internal IP addresses.
When a container is started without explicitly defining a network, it is automatically attached to
the default bridge network. It provides basic connectivity between containers on the same host
and enables outbound access to external networks through network address translation (NAT).

To display all available networks on the system, use the following command:
NETWORK ID

DRIVER

SCOPE

ddc4000a164a

9863af190579

30680f288897

none

null

To examine the details of the bridge network — including configuration settings, connected
containers, and IP address assignments — use:
$ docker network inspect bridge

Bridge networks operate in isolation from the host’s main network interface, meaning containers
on these networks cannot be accessed externally unless specific ports are published.
The -p option maps a container port to a host port, allowing external access to containerized

This maps port 80 inside the container to port 8080 on the host, making it accessible externally.
Clients send traffic to the host’s port 8080 to reach the web port on the container.

Host Network
Whereas the bridge driver preserves network isolation between the container and the host, the
host driver removes this isolation. The container shares the host’s networking stack, having
direct access to its IP address and interfaces:

This is useful for high-performance or low-latency use cases, but by sacrificing isolation it can lead
to port conflicts.

None Network
The none network disables all networking for the container. It is useful for debugging or scenarios
where network access is not needed.
The following example demonstrates how the none network mode completely isolates a container
from all external and internal networks:

Inside the container, network access is unavailable. Attempts to resolve hostnames or connect to
the internet fail:
/ # ping lpi.org
ping: bad address 'lpi.org'

Similarly, utilities that rely on DNS or external connectivity, such as wget, cannot reach external

/ # wget http://lpi.org
wget: bad address 'lpi.org'

Inspecting the network interfaces confirms that only the local loopback interface (lo) is active,
with no external network interfaces available:
/ # ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever

User-Defined Bridge Networks
By default, Docker containers on the same host can communicate with each other only when they
are connected to the same user-defined network.
Creating a custom bridge network allows containers to automatically discover each other by
name through Docker’s built-in DNS service, simplifying inter-container communication.
To create a user-defined bridge network, execute:

After creating a user-defined bridge network, confirm its presence by listing all available
NETWORK ID

DRIVER

SCOPE

2b0a1c0f12c3

e91d1b10cdd1

f4c2a7c2ff01

none

null

a9b3f84b12df

mynet

To attach a container to the new mynet network, specify the --network option when starting it.
The following example launches a container named db57 running a MariaDB database instance
connected to the mynet network:

--network mynet \
-e MYSQL_ROOT_PASSWORD=secret \
mariadb

This container listens on the default port 3306 within the mynet network, making it accessible to
other containers connected to the same network.
Next, start another container attached to the same mynet network to verify that containers
connected to the same user-defined bridge can communicate with each other.
The test confirms network connectivity between containers, regardless of which images are used.
$ docker run -it --rm \
--network mynet \
alpine sh

Run the following commands inside the alpine container to test communication with the
MariaDB container db57 through the mynet network.
This confirms that containers on the same user-defined bridge can reach each other by name
using Docker’s built-in DNS service.
/ # apk add --no-cache mariadb-client
/ # mariadb -h db57 -u root -psecret -e "SHOW DATABASES;"
+--------------------+
| Database

+--------------------+
| information_schema |
| mysql

| performance_schema |
| sys

+--------------------+

The Alpine container can reach db57 via DNS resolution automatically provided by Docker.
From the host system, verify that both containers are attached to the mynet network by inspecting
its configuration details.
The docker network inspect command displays all containers connected to the network, along

with their assigned IP addresses and metadata.
$ docker network inspect mynet
[
"Name": "mynet",
"Driver": "bridge",
"Containers": {
"a1b2c3d4e5f6": {
"Name": "db",
"IPv4Address": "172.18.0.2/16"
},
"b2c3d4e5f6g7": {
"Name": "app",
"IPv4Address": "172.18.0.3/16"
]

After completing the connectivity test, clean up the environment by removing the containers and
the user-defined network. This ensures that no unnecessary resources remain allocated:
$ docker rm -f db57
$ docker network rm mynet

DNS Service Discovery
DNS service discovery allows containers to find and communicate with each other using humanreadable names rather than hardcoded IP addresses.
In Docker and Podman, when containers are connected to the same custom, user-defined bridge
network, they are automatically registered in an internal DNS system. This means that one
container can resolve the hostname of another container by its container name, making serviceto-service communication more flexible and reliable.
For example, if the host is running a database container named db, a web application container
can connect to it simply by using db as the hostname. This dynamic and automatic discovery
process simplifies configuration and enables scalable, microservices-based architectures where
services can be added, removed, or updated without manual IP management.

Overlay Networks
The overlay network is designed for multihost communication. It enables containers running on
different Docker hosts (typically part of a Swarm cluster) to communicate securely when
encryption is enabled. Docker automatically routes each network packet to the appropriate
daemon host and destination container, managing all communication transparently.
Overlay networks are essential in production environments where services need to scale across
nodes.
Overlay networks require Swarm mode, which is Docker’s native solution for container
orchestration. Swarm mode allows you to deploy and manage a cluster of Docker nodes as a single
virtual system. With Swarm, you can scale services across multiple machines, ensuring high
availability, load balancing, and fault tolerance.
To set up a Docker Swarm environment, begin by initializing the swarm with the following
command:
$ docker swarm init

Next, create an overlay network to enable communication between services across multiple
nodes in the swarm:
$ docker network create --driver overlay my_overlay

Once the network is created, deploy services that utilize it.
For example, the following command launches an Nginx-based service named webapp connected
to the my_overlay network:
$ docker service create --name webapp --network my_overlay nginx

The overlay network in Docker Swarm automatically manages several critical aspects of
container communication across a distributed cluster. It enables cross-node communication,
allowing containers running on different hosts to seamlessly interact as if they were on the same
local network.
It also provides built-in service discovery, so containers can locate and communicate with services
using simple DNS names. Additionally, the overlay network encrypts the traffic between
containers, enhancing security by protecting data in transit.

The overlay network supports load balancing across service replicas, distributing incoming
requests evenly to maintain performance and reliability across the cluster.

Inspecting Container Networking
To view the network settings of a running container, enter:
$ docker inspect <container_name_or_id>

Look for the Networks section of the output to see IP addresses, MAC addresses, and connected
networks.
Alternatively, enter:
$ docker exec -it container_name ip addr

This shows the network interfaces and assigned IP addresses from inside the container.

Connecting and Disconnecting Networks
Containers can be dynamically attached to or detached from networks at runtime, allowing
flexible reconfiguration of communication paths without stopping or recreating containers.
$ docker network connect mynet app
$ docker network disconnect bridge app

This capability simplifies multi-network setups, enabling containers to join or leave networks as
required for different operational or security scenarios.

Removing Docker Networks
The docker network rm command removes one or more Docker networks from the system. This
is particularly useful for cleaning up unused or obsolete networks that are no longer in use by
containers.
Only custom (non-default) networks can be removed. Built-in networks such as bridge, host, and
none cannot be removed, as they are managed by Docker itself. The syntax of the command is:

$ docker network rm [<network-name-or-id> ...]

If a network is still in use by any container, the command will fail with an error.
To enable removal, list the containers that are using the custom network:
$ docker network inspect my_custom_net

At this stage, containers connected to the network can be stopped or disconnected before the
network itself is removed.
This ensures a clean and error-free removal process, as Docker does not allow the deletion of a
network that still has active container attachments.

Cleaning Up Unused Docker Networks
The docker network prune command removes all unused Docker networks in a single step. An
“unused” network is any custom network not currently connected to a running container. The
syntax is:
$ docker network prune

When the command runs, Docker will prompt for confirmation before deleting. Default networks
(bridge, host, none) are not affected by this command.

Macvlan Networks
A Macvlan network allows each container to appear as a physical device directly connected to the
host network, with its own unique MAC address and IP address.
Unlike the traditional bridge driver, which performs network address translation (NAT),
macvlan enables containers to communicate directly with other devices on the physical
network — just like separate hosts.
This approach is useful in scenarios where containers must be accessible as independent devices
on the same Layer 2 network as the host, such as when integrating with legacy systems,
monitoring tools, or DHCP-based environments that expect unique MAC addresses per node.
To create a Macvlan network, specify the parent interface of the host and the subnet
configuration:

$ docker network create -d macvlan \
--subnet=192.168.1.0/24 \
--gateway=192.168.1.1 \
-o parent=eth0 my_macvlan

In this example:
-d macvlan
defines the driver type.
--subnet and --gateway
configure the Layer 3 network settings.
-o parent=eth0
specifies the host’s physical network interface used by the Macvlan network.
my_macvlan
is the name of the newly created network.
Containers attached to this network receive their own IP addresses within the specified subnet
and can communicate with external devices on the same LAN without NAT.
However, direct communication between the host and its containers is not possible by default; a
workaround involves creating a separate Macvlan interface on the host to act as a peer on the
same subnet.
Macvlan networking is commonly used in environments that require high performance, isolation,
or compatibility with systems expecting traditional network interfaces — such as IoT gateways,
network appliances, or on-premises server integrations.

Docker Storage
Storage is a critical aspect of containerized applications. Although containers are often perceived
as ephemeral and stateless, real-world applications frequently require persistent data: database
files, uploaded media, configuration artifacts, etc. Docker provides several mechanisms to handle
storage, allowing developers and operators to manage how data is stored, shared, and preserved
across container lifecycles. Each of these mechanism — volumes, bind mounts, and tmpfs
mounts — serves a different purpose and is suited for different scenarios.
When a container is running, it generates a temporary read-write (RW) layer on top of the image’s
immutable read-only layers, capturing all changes made during execution. This RW layer persists

even after the container is stopped with docker stop, and is removed from disk only when the
container is deleted using docker rm. To streamline cleanup, docker run --rm automatically
discards this layer after the container exits, while docker container prune removes all stopped
containers and their associated RW layers.
Because this layer is inherently ephemeral, Docker provides persistent storage mechanisms to
preserve data beyond the container’s lifecycle, ensuring that important information is not lost
when the container is removed.

Volumes
Volumes are the most robust and preferred mechanism for persisting data in Docker and Podman.
Volumes are stored on the container’s host machine. Volumes keep the data that is generated and
used by containers in persistent storage, so that it lasts even as containers come and go. Unlike the
container’s RW layer, data in a volume remains intact even if the container is removed.
Docker and Podman manage volumes in specific directories on the host (e.g.,
/var/lib/docker/volumes/ or /var/lib/containers/storage/volumes/), and volumes can
be mounted into containers to store databases, configuration files, logs, or any other data the
application needs to make persistent. This allows containers to be stateless while ensuring that
important data is safely stored on the host.
Creating Volumes
Volumes are created using:
$ docker volume create mydata

Mounting or Attaching a Volume in a Container
Volumes are portable. Thus, they can be shared between multiple containers, making them ideal
for production use. They are also decoupled from the container lifecycle, so deleting a container
won’t remove the associated volume unless its deletion is explicitly called for.
To attach a volume to a container, use the -v or --volume option:
$ docker run -v mydata:/app/data myimage
$ docker run --volume mydata:/app/data myimage

Alternatively, the --mount option can be used with the docker run command to provide a

clearer and more structured syntax for defining volume mounts:
$ docker run --mount type=volume,src=<volume-name>,dst=<mount-path>

While both options achieve similar results, --mount is generally recommended for its clarity and
flexibility. It provides a more structured syntax and supports additional options, such as
readonly or ro, which makes the volume read-only inside the container. You can simultaneously
mount a single volume as read-write for some containers and as read-only for others.
The readonly option mounts a volume in read-only mode, preventing the container from
modifying its contents. This is particularly useful for serving static files or protecting
configuration data that should not be altered by running processes:
$ docker run -d \
--name=nginxtest \
--mount source=nginx-vol,destination=/usr/share/nginx/html,readonly \
nginx:latest

The same behavior can be achieved using the shorthand -v syntax by appending :ro (read-only)
to the mount specification:
$ docker run -v .:/project:ro nginx:latest

This maps a local directory . into /project inside the container in read-only (ro) mode.
Some special behaviors of volumes include:
- When a container starts with a volume that doesn’t yet exist, Docker automatically creates a
new, empty volume. This behavior is particularly useful for prepopulating shared data that
multiple containers might later access.
- If an empty volume is mounted to a directory inside the container that already contains files or
subdirectories, Docker automatically copies the existing contents of that directory into the new
volume. This allows initial application files or configurations to be preserved in persistent
storage.
- If a non-empty volume is mounted to a directory that already contains data, the original
contents of that directory become temporarily hidden by the volume’s contents. This behavior
is similar to mounting an external drive (for example, /mnt) in Linux, where existing files are
hidden until the volume is unmounted.

Listing Volumes
To list all available volumes on the host, use the following command:
$ docker volume ls
DRIVER

VOLUME NAME

mydata

Removing Unused Volumes
The docker volume rm command removes one or more volumes from the host. Multiple
volumes can be deleted in a single command by listing them sequentially:
$ docker volume rm my-vol1 my-vol2

A volume cannot be removed while it is still being used by a container. To delete it, the container
must first be stopped and removed:
$ docker stop mycontainer
$ docker rm mycontainer
$ docker volume rm myvolume

To remove all unused volumes in one step, use the docker volume prune command. This cleans
up any volumes not currently attached to containers, freeing disk space:
$ docker volume prune

Shared and Persistent Container Storage
Volumes are particularly useful for sharing and persisting data between containers. For instance,
one container can write log files or generated content to a shared volume, while another
container reads, processes, or analyzes that same data — all without requiring manual file
transfers or complex networking.
To create a shared volume:
$ docker volume create shared-data

This command initializes a named volume called shared-data, which can be mounted by

multiple containers:
$ docker run -d --name writer -v shared-data:/app/data my-writer-image
$ docker run -d --name reader -v shared-data:/app/data:ro my-reader-image

In this example:
- The writer container writes data to /app/data inside the shared volume.
- The reader container accesses the same directory in read-only mode (:ro), ensuring data
consistency and preventing accidental overwrites.
This setup allows containers to share files seamlessly, even when isolated from each other.
Volumes are also valuable for backups, data inspection, and restoration tasks. Because volumes
exist independently from container images, their contents persist even after containers are
deleted — ensuring that essential data remains safe and reusable across deployments.

Bind Mounts
Bind mounts provide a direct link between a directory or file on the host system and a path inside
a container. Unlike volumes, which are managed entirely by Docker, bind mounts rely on existing
host filesystem paths. This creates a tight coupling between host and container, granting the
container direct access to the source content:
$ docker run -v /path/on/host:/path/in/container myimage
$ docker run --mount type=bind,source=/home/user/code,target=/app/code myimage

Bind mounts are extremely useful in development environments, where real-time file updates are
needed.
For example, when editing application source code or configuration files on the host, changes are
instantly reflected inside the running container — no rebuilds required.
However, bind mounts should be used with care:
- They depend on the host’s directory structure, reducing portability.
- They can expose sensitive host files if paths are not controlled properly.
- They provide containers with direct read/write access to host data, which can pose security
risks in production environments.

For stable and portable deployments, volumes are generally preferred. Bind mounts are best
suited for local development, testing, and troubleshooting scenarios.

Tmpfs Mounts
A tmpfs mount stores data directly in the host system’s memory (RAM) instead of on disk. This
makes it ideal for temporary or sensitive data that should not persist once the container stops.
Because it never touches disk storage, access is extremely fast, and data automatically disappears
when the container is removed or restarted.
To create a tmpfs mount with the docker run command, either syntax can be used:
$ docker run --mount type=tmpfs,dst=/app/cache myimage

or:
$ docker run --tmpfs /app/cache myimage

The two options behave equivalently, mounting a temporary in-memory filesystem at
/app/cache inside the container. Any data written there is ephemeral and lost when the
container stops, providing a secure and transient workspace.
Similar to volumes, if a tmpfs mount overlays an existing directory inside a container, the
original contents of that directory become hidden until the mount is removed.
Two important restrictions apply:
- tmpfs mounts cannot be shared between containers. Each mount exists only within the
container where it was created.
- This feature is supported only on Linux hosts.
tmpfs mounts are commonly used for caching, storing session data, or handling temporary files
that must never persist on disk, balancing performance and security.

Rootless Containers
Rootless containers are a security-enhancing feature that allow containers to run without
requiring root (administrator) privileges on the host system.
Traditionally, container engines like Docker required elevated permissions for essential tasks

such as creating namespaces, setting resource limits, and managing network interfaces. However,
this posed security risks, especially in multitenant environments, where privilege escalation or
container breakout could compromise the host.
With rootless containers, these operations are performed entirely in user space, using Linux
features such as user namespaces. This means that a non-privileged user can create and manage
containers without needing sudo access or interacting with system-level daemons.
Podman was designed to support rootless mode, and Docker has also added support for it in
recent versions.
Rootless containers improve isolation and reduce the attack surface on shared systems. They are
particularly useful in environments where users need to run containers securely without full
administrative control. Such environments include CI/CD runners, development machines, and
academic labs. While rootless mode may have some limitations (for instance, restricted access to
certain networking modes or file systems), it offers a compelling tradeoff between functionality
and security.

## 1. When you run a Docker container without specifying a network, which network driver is used
by default?
