---
id: lpi-701-200-01
title: "LPIC-1 · 701-200 — Software Engineering, What is the main difference between Agile…"
slug: lpi-701-200-01-lpic-1-701-200-software-engineering-what-is-the-main-differe
source: "LPI Learning Material — LPIC-1 (Exam 701-200)"
sourceSection: "Topic 701: Software Engineering, 1. What is the main difference between Agile and DevOps in terms of their focus within the, 3. What role do DevOps practices play in supporting Agile principles like frequent delivery and, 1. Retrospectives are a core part of the Agile cycle, where teams reflect on t"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "This lesson introduces the foundations of Agile and DevOps, two complementary approaches that Covers 20 sections: Software Engineering, What is the main difference between Agile and DevOps in terms of their focus within the, What role."
---
# LPIC-1 · 701-200 — Software Engineering, What is the main difference between Agile…

## Topic 701: Software Engineering

DevOps Tools Engineer v2.0, Exam 701, Objective 701.1
- Understand and design service based applications
- Understand common API concepts and standards
- Understand aspects of data storage, service status and session handling
- Understand the properties of cloud native applications
- Design software to be run in containers
- Design software to be deployed to cloud services
- Awareness of risks in the migration and integration of monolithic legacy software
- Awareness of database schema updates and database migrations
- Understand the concept of agile software development
- Understand the concept of DevOps and its implications to software developers and operators
- REST, JSON
- Service Oriented Architectures (SOA)
- Microservices
- Immutable servers

- Loose coupling
- Test-driven development

This lesson introduces the foundations of Agile and DevOps, two complementary approaches that
have transformed modern software engineering.
DevOps — combining the terms “development” and “operations” — emerged in the early 2000s as
a response to the growing need for faster, more reliable, and scalable software delivery. It
promotes collaboration between developers and IT operations teams to automate processes,
enhance communication, and ensure continuous integration and continuous delivery (CI/CD).
To understand how DevOps evolved, this lesson begins by exploring the traditional software
development models that preceded it — most notably, the waterfall model — and the challenges
they posed in dynamic, fast-paced environments. From there, it examines how agile software
development introduced iterative, adaptive, and collaborative methods that align naturally with
DevOps principles. This lesson introduces the principles of Agile and how they align with the
demands of modern software delivery in collaborative, DevOps-oriented environments.

What is Agile?
Agile is not a single method or technology, but a mindset rooted in the values and principles of the
Agile Manifesto, published in 2001. It emphasizes individuals and interactions, working software,
customer collaboration, and responding to change over traditional documentation-heavy and
plan-driven approaches.
Agile encourages iterative development, where teams deliver software in small, consumable
increments, allowing for frequent feedback and rapid adaptation.
The four values of the Agile Manifesto are supported by 12 guiding principles. These principles
shape the mindset and practices of agile teams and are directly aligned with modern DevOps
workflows. Let’s take a closer look at five of the principles with the most impact on software
development and operations.

Deliver Working Software Frequently
Agile encourages short, regular release cycles, often ranging from one to four weeks. This practice
reduces risk, accelerates feedback loops, and allows for quick validation of business value. In
DevOps, these cycles are implemented through continuous integration (CI) and continuous delivery
(CD) pipelines that automatically test and deploy code changes. Frequent delivery ensures that
features reach users faster and that bugs can be identified and resolved before they escalate.

Welcome Changing Requirements
Unlike traditional models, where late-stage changes are seen as costly or disruptive, Agile
embraces change as a natural part of the development process. Requirements are expected to
evolve as users interact with the system and provide feedback.
In DevOps, infrastructure-as-code and containerization allow teams to respond to changes quickly
and consistently, reducing the friction typically associated with late adjustments.

Build Projects Around Motivated Individuals
Agile promotes a people-first philosophy. Rather than relying on rigid processes or
micromanagement, agile teams thrive when composed of autonomous, cross-functional
individuals who are empowered to make decisions.
For DevOps teams, this means developers, sysadmins, testers, and security professionals working
side by side, with shared ownership of the product and its operational performance.

Maintain a Constant Pace
Sustainable development avoids burnout and ensures long-term productivity. Agile teams strive
to avoid overcommitting and instead focus on delivering steady, predictable output over time.
DevOps reinforces this principle through automation, alerting, and observability tools, which
reduce manual toil and enable teams to handle incidents without disrupting overall velocity.

Reflect and Adjust Regularly
Agile encourages continuous improvement through regular retrospectives. These meetings allow
teams to discuss what went well, what didn’t, and what can be improved in the next iteration.
This aligns closely with DevOps' post-incident reviews and the use of metrics such as lead time,
deployment frequency, and change failure rate to guide improvements across both development
and operations.

Agile Methodologies
Agile is not a one-size-fits-all process. Over the years, several frameworks and methodologies have
emerged to help teams implement Agile principles in practical ways. Each has its own structure,
strengths, and use cases. Overviews follow of the most common ones, those that are particularly
relevant for DevOps teams working in collaborative, cross-functional environments.

Scrum
Scrum is a structured framework that organizes work into short, fixed-length development cycles
known as sprints. Each sprint typically lasts between one and four weeks and results in a
potentially releasable increment of the product. Scrum introduces clearly defined roles, such as
the Scrum master, who facilitates the process and helps remove impediments; the product owner,
who prioritizes and manages the product backlog; and the development team, which is responsible
for delivering the work.
Scrum also includes a set of recurring meetings, or ceremonies, that help structure team activities.
These include daily stand-up meetings for quick synchronization, sprint planning sessions to define
goals for the upcoming sprint, sprint reviews to demonstrate completed work, and retrospectives
to reflect on the process and identify improvements. This cycle of delivery, feedback, and
refinement supports continuous learning and incremental progress, which aligns well with the
rapid delivery goals of DevOps teams.

Kanban
Kanban offers a more flexible and flow-based approach to Agile. Rather than working in timeboxed iterations, Kanban focuses on visualizing the team’s workflow using a board where tasks
move through various stages, such as “To Do,” “In Progress,” and “Done.” This method emphasizes
the importance of limiting work in progress, to avoid overloading the team and to maintain a
steady, predictable flow of tasks.
Because there are no prescribed roles or ceremonies, teams using Kanban can adopt it gradually.
This trait makes it particularly effective for operations and support, where priorities can shift
quickly and work items vary in complexity. The continuous delivery mindset supported by
Kanban makes it highly compatible with DevOps practices, particularly when integrated with
automated pipelines and monitoring tools.

Extreme Programming (XP)
Extreme programming, or XP, is a methodology that focuses on achieving technical excellence and
improving software quality through rigorous engineering practices. It promotes qualityenhancing practices such as pair programming, where two developers work together on the same
piece of code to ensure quality and share knowledge.
XP also emphasizes test-driven development, in which automated tests are written before the actual
implementation code, ensuring that software behavior is continuously validated.
Another core element of XP is continuous integration, which involves merging code changes into a
shared repository several times a day, accompanied by automated builds and tests. These
practices reduce integration problems, encourage clean and maintainable code, and foster a
culture of responsibility and collaboration, all of which are vital in high-performing DevOps
teams.

SAFe, LeSS, Nexus
In larger organizations, where multiple teams must collaborate across products or services, scaled
Agile frameworks provide the structure necessary to maintain alignment and coordination.
Frameworks such as Scaled Agile Framework (SAFe), Large-Scale Scrum (LeSS), and Nexus address
the challenges of scaling Agile practices to enterprise-level environments.
SAFe integrates principles from Agile and DevOps with Lean, another popular methodology that
focuses on eliminating waste, optimizing processes, and maximizing value delivery. It also
introduces additional roles and planning layers to synchronize work across teams and
departments.

LeSS extends Scrum principles to multiple teams working on a single product, aiming to maintain
simplicity and minimize overhead.
Nexus, created by Scrum.org, focuses on cross-team coordination for up to nine Scrum teams
sharing a common backlog.
These scaled frameworks provide the organizational scaffolding required to manage complexity
while preserving Agile’s responsiveness and adaptability.

Agile in Practice: Lifecycle and Artifacts
While not as rigid or sequential as the waterfall model, Agile still follows a set of well-defined
stages that guide teams through planning, execution, review, and continuous improvement. These
stages ensure that development remains iterative, adaptive, and aligned with user needs
throughout the software lifecycle.

Sprint Planning
In Agile environments, software is developed through a series of short, repeatable cycles known
as iterations or sprints. These iterations usually span from one to four weeks, depending on the
team’s workflow and the complexity of the project. Each iteration follows a structured lifecycle
designed to promote continuous feedback, adaptive planning, and incremental delivery of
working software.
The iteration begins with a planning phase, during which the team defines the goal and scope of
the sprint. This is known as sprint planning and involves selecting the most valuable user stories
from the product backlog, estimating the effort required, and breaking the work down into
actionable tasks.

Execution
Once the plan is established, the team moves into the execution phase, where developers code,
test, and integrate the selected features. This phase emphasizes collaboration, continuous
integration, and early testing to ensure quality and stability throughout the sprint.

Review
Following the execution, the team conducts a sprint review. This is a demonstration session where
the team presents the completed work to stakeholders, gathers feedback, and verifies that the
software meets the agreed-upon criteria.

Retrospective
During this reflective meeting, the team discusses what went well, what challenges were
encountered, and how their processes can be improved for future iterations. The retrospective
reinforces Agile’s core principle of continuous improvement and supports a culture of learning
and adaptation.

Artifacts
In addition to this iterative lifecycle, Agile teams rely on a set of core artifacts to manage work and
maintain transparency. One of the most essential artifacts is the user story, which represents a
specific feature or function from the end-user’s perspective. User stories are intentionally
lightweight and focused on value, often structured using the format: “As a user, I want [feature] so
that [benefit].”
All user stories are collected and prioritized in a product backlog, which serves as a dynamic to-do
list for the entire project. The product backlog evolves continuously as new requirements emerge
and priorities shift. For each sprint, the team creates a sprint backlog, which contains the user
stories that have been committed for delivery during that iteration. This backlog provides a
focused view of the work in progress and serves as a reference point during the sprint.
To monitor progress, teams often use a burndown chart. This visual tool tracks the amount of
work remaining over time, providing a clear indication of whether the team is on track to meet its
sprint goals. Burndown charts support data-driven discussions during daily stand-up meetings
and help teams adjust their pace or scope as needed.
Together, the Agile lifecycle and its associated artifacts form the foundation of a transparent,
adaptive, and value-driven development process.

Benefits of Agile in Modern Software Development
Agile principles and frameworks bring a range of practical benefits to organizations, especially
those operating in cloud-native, containerized, or microservice-based environments.
One of the most important benefits is early and continuous value delivery. Agile teams ship
working features incrementally, which means stakeholders start receiving value sooner and can
validate the product’s direction through real-world use. This is essential in environments where
requirements evolve rapidly or where user feedback drives development.
Another benefit is improved adaptability. Agile welcomes changes — even late in the development
process — allowing teams to pivot quickly in response to market dynamics or shifting priorities.

Combined with DevOps automation, these changes can be propagated safely and swiftly across
Agile also improves collaboration across roles. By breaking down silos between development and
operations, Agile fosters better communication and shared responsibility. This results in higher
quality releases and faster recovery times when issues arise.
In addition, Agile drives technical quality through practices such as automated testing, continuous
integration, and code reviews. These are all essential to maintaining a reliable and maintainable
system, especially when changes are deployed frequently.
Finally, Agile supports greater transparency and visibility. Stakeholders can track progress in real
time, participate in sprint reviews, and influence priorities. This level of engagement helps ensure
that the product meets both technical and business goals.
Agile methodologies have revolutionized the way software is developed by promoting iterative
delivery, continuous feedback, and close collaboration with stakeholders. However, Agile alone
does not fully address the challenges of deploying, operating, and scaling software in complex
production environments. This is where DevOps becomes essential.

What is DevOps?
By integrating operations into the Agile development cycle, DevOps extends the benefits of agility
beyond code creation to include deployment automation, infrastructure management, and system
monitoring. This seamless collaboration between development and operations leads to faster
releases, greater reliability, and a more resilient end-to-end software delivery process.
DevOps is not a specific tool or framework. Instead, it is a set of practices and a philosophy aimed
at unifying software development (Dev) and IT operations (Ops).
DevOps is a cultural and technical movement that integrates people, processes, and tools across
development and operations to accelerate the delivery of high-quality software. It encourages
teams to collaborate from the very beginning of a project, sharing knowledge, responsibilities, and
feedback throughout the product’s lifecycle.
The DevOps approach is based on several key principles. These include automation of repetitive
tasks such as building, testing, and deploying software, continuous integration and continuous
delivery_ (CI/CD), infrastructure-as-code, proactive monitoring, and a strong emphasis on
communication and accountability across teams.
Rather than handing off completed code to operations teams for deployment, DevOps promotes
cross-functional teams in which developers, operators, testers, and security professionals work

together as one unit.

Implications for Software Developers
For software developers, DevOps means greater involvement in the lifecycle of an application
beyond just writing code. Developers are now expected to understand how their applications will
behave in real-world production environments. This includes being familiar with
containerization, infrastructure provisioning, and monitoring tools.
Developers in DevOps teams often write and maintain automated pipelines for testing and
deployment. They use continuous integration systems to ensure that every code change is
automatically tested and integrated with the rest of the application. By embracing infrastructure
as code, developers can define system configurations and dependencies alongside application
code, making the deployment process more predictable and consistent.
In short, DevOps expands the developer’s responsibilities and enables them to build more resilient
and maintainable systems. It also improves feedback loops, enabling developers to learn from
production performance and user behavior, which leads to better design decisions and faster
innovation.

Implications for System Operators
For system operators or sysadmins, DevOps introduces a shift from manual configuration and
maintenance to automated, programmable infrastructure. Operators work closely with
developers to define infrastructure as code, manage cloud environments, monitor system
performance, and ensure scalability and reliability.
Instead of reacting to issues after they arise, operations professionals in a DevOps environment
focus on proactive monitoring, logging, and incident response automation. They help define and
enforce service-level objectives (SLOs) and error budgets, collaborating with developers to balance
stability with innovation.
Operators also play a critical role in security and compliance, implementing DevSecOps practices
that integrate security checks and validations directly into CI/CD pipelines.
This new way of working requires sysadmins to be comfortable with scripting, automation tools,
configuration management systems, and cloud platforms. It also encourages a mindset of
continuous learning and experimentation.

The DevOps Toolchain
To support the DevOps philosophy, teams rely on a wide range of tools that automate and

streamline the software delivery process. These tools span several categories, including:
Version control systems
(e.g., Git) to manage code collaboratively.
Continuous integration servers
(e.g., Jenkins, GitLab CI, GitHub Actions) to automate build and test processes.
Configuration management tools
(e.g., Ansible, Puppet, Chef) to provision and manage infrastructure.
Containerization platforms and orchestrators
(e.g., Docker, Kubernetes) to deploy applications consistently across environments.
Monitoring and observability tools
(e.g., Prometheus, Grafana, ELK Stack) to provide real-time insights into system health and
These tools play a vital role in minimizing human error, accelerating deployment, and enhancing
visibility throughout the entire software delivery pipeline.

Agile and DevOps
While Agile focuses on how to develop software, DevOps focuses on how to deliver and operate it.
Together, they enable:
Continuous integration/continuous delivery (CI/CD)
Agile iterations feed into automated pipelines.
Fast feedback loops
Both technical (testing, monitoring) and human (user stories, retrospectives).
Cross-functional teams
Developers, sysadmins, and testers collaborate from day one.
Agile and DevOps jointly reduce lead time, improve resilience, and support high availability and
scalability.

## 1. What is the main difference between Agile and DevOps in terms of their focus within the
software development lifecycle?

2. How does Agile encourage teams to adapt to change throughout a project?

## 3. What role do DevOps practices play in supporting Agile principles like frequent delivery and
continuous improvement?

## 1. Retrospectives are a core part of the Agile cycle, where teams reflect on the process and look
for ways to improve. Research how real-world Agile or DevOps teams conduct retrospectives.
What techniques or tools do they use, and how do these practices help teams improve over
time?

## 2. Research how Scrum and Kanban are used in practice by software or DevOps teams. What are
the main operational differences, and in what contexts is each more effective?

Agile is a mindset and methodology that has reshaped software development by promoting short,
iterative cycles, close collaboration, and frequent delivery of working software. Rooted in the
Agile Manifesto, it emphasizes adaptability, user feedback, and continuous improvement.
Frameworks such as Scrum, Kanban, Extreme Programming (XP), and scaled approaches like
SAFe, LeSS, and Nexus help teams of all sizes apply Agile principles in real-world settings,
especially in environments that require speed, flexibility, and cross-functional cooperation.
However, Agile by itself does not address all the challenges of running software in complex
production environments. That’s where DevOps comes in. DevOps extends the Agile philosophy by
integrating operations into the development lifecycle, and thereby bringing automation,
infrastructure management, monitoring, and deployment under a unified workflow. It
encourages developers and operators to work together from the start, sharing tools,
responsibilities, and goals.

## 1. What is the main difference between Agile and DevOps in terms of their focus within the
software development lifecycle?
Agile focuses primarily on how software is developed, emphasizing iterative development,
continuous feedback, and collaboration between stakeholders and development teams.
DevOps, on the other hand, focuses on how software is delivered and operated — integrating
operations into the development process through automation, deployment pipelines,
infrastructure management, and monitoring. While Agile optimizes the creation of software,
DevOps ensures that this software is reliably deployed, maintained, and scaled in production
2. How does Agile encourage teams to adapt to change throughout a project?
Agile encourages adaptability through short, time-boxed development cycles known as sprints,
which allow teams to frequently reassess priorities and incorporate feedback. Agile principles
welcome changing requirements — even late in development — and promote regular
retrospectives to evaluate what’s working and what needs to improve. This cycle of continuous
reflection and adjustment helps teams respond effectively to evolving user needs and market
conditions.
3. What role do DevOps practices play in supporting Agile principles like frequent delivery and
continuous improvement?
DevOps practices operationalize Agile principles by automating critical stages of the software
delivery process. Through tools like CI/CD pipelines, DevOps enables frequent and reliable
delivery of working software. Infrastructure-as-code and proactive monitoring provide
consistency and insight into system performance, supporting faster feedback loops. These
practices ensure that each Agile iteration can be smoothly deployed, tested, and evaluated in
real-world environments, reinforcing a culture of continuous improvement across both
development and operations.

## 1. Retrospectives are a core part of the Agile cycle, where teams reflect on the process and look
for ways to improve. Research how real-world Agile or DevOps teams conduct retrospectives.
What techniques or tools do they use, and how do these practices help teams improve over
time?
In real-world Agile and DevOps environments, teams often conduct retrospectives at the end of
each sprint using structured facilitation techniques such as “Start, Stop, Continue,” “Mad, Sad,
Glad,” or “4Ls” (Liked, Learned, Lacked, Longed for). These retrospectives help teams identify
recurring bottlenecks, improve communication, and evolve their workflows.
2. Research how Scrum and Kanban are used in practice by software or DevOps teams. What are
the main operational differences, and in what contexts is each more effective?
Scrum is commonly used in product development teams that benefit from time-boxed
planning, structured ceremonies, and clearly defined roles. It provides predictability and
rhythm through sprints and regular checkpoints. Kanban, by contrast, is often preferred by
teams with continuous workflows, such as IT operations or support teams, where work arrives
unpredictably. Kanban allows more flexibility by focusing on flow efficiency and limiting work
in progress. While Scrum requires sprint planning and retrospectives, Kanban emphasizes
real-time prioritization and gradual process improvement. In practice, many DevOps teams
blend both, using Scrum for planning and team coordination, while applying Kanban
principles to manage incoming requests and infrastructure tasks.

As organizations increasingly shift their infrastructure and applications to cloud environments, a
new paradigm of software design has emerged: cloud native. Cloud-native applications are built to
thrive and scale in modern, dynamic environments. They are designed from the ground up to
exploit the full capabilities of the cloud, including elasticity, distributed computing, automation,
and continuous delivery.
This lesson explores the defining properties of cloud-native applications, focusing on three
foundational characteristics: immutable servers, loose coupling, and test-driven development.
Understanding these properties is essential for developers, operators, and DevOps professionals
aiming to build resilient, scalable, and maintainable software systems. The lesson also covers
service-oriented architectures (SOA) and common API concepts and standards.

What Does “Cloud Native” Mean?
Cloud native doesn’t mean just hosting applications in the cloud. It refers to an approach that
maximizes the benefits of cloud computing by embracing microservices architecture,
containerization, orchestration, automation, and continuous integration/continuous delivery

(CI/CD). The Cloud Native Computing Foundation (CNCF) defines cloud-native technologies as those
that empower organizations to build and run scalable applications in modern, dynamic
environments such as public, private, and hybrid clouds.
Cloud-native applications are designed to be resilient, manageable, and observable. They are
composed of microservices packaged in containers, deployed dynamically, and orchestrated to
optimize resource utilization. The shift from monolithic to microservice-based architectures
supports agility and rapid deployment, making the cloud-native model ideal for today’s fast-paced
development cycles.

Immutable Servers
One of the key concepts in cloud-native architecture is the idea of immutable servers. In traditional
systems, servers are often long-lived and subject to manual configuration changes over time. This
approach leads to configuration drift, unpredictability, and operational complexity.
In contrast, immutable infrastructure ensures that once a server or service is deployed, it is never
modified. Instead of updating an existing server, a new instance is created from a tested and
versioned image.
This model brings several advantages: It enhances consistency across environments, since all
instances are created from the same image. It also simplifies rollback, because previous images
can be redeployed if a problem arises.
Immutable servers reduce the risk of human error and eliminate the accumulation of
undocumented changes. Automation tools such as Terraform, Ansible, and Packer are commonly
used to define and build immutable images. Containerization platforms like Docker and Podman
and orchestration tools like Kubernetes reinforce immutability by providing declarative
configuration and stateless deployment patterns.
The concept of immutability also extends to infrastructure-as-code (IaC). With IaC, infrastructure is
defined and provisioned through machine-readable files, enabling repeatable, testable, and
version-controlled deployments. This approach aligns closely with DevOps practices and ensures
that environments remain consistent across development, staging, and production.
To better understand the practical benefits of immutable infrastructure, it is useful to examine
real-world implementations of immutable servers across various technologies. These examples
illustrate how immutability can be achieved through many different tools at different levels of
detail, ranging from cloud virtual machines and containers to orchestrated deployments and
infrastructure automation tools. In each case, the core principle remains the same: rather than
modifying a live system, a new version is created and deployed, ensuring consistency, reliability,
and predictability across all stages of the software lifecycle.

EC2 with Amazon Machine Images (AMIs)
In AWS, teams can create Amazon Machine Images (AMIs) that contain the full operating system
(OS), dependencies, application code, and configurations for a computing instance. Every time an
update is needed, a new AMI is built, and a new Elastic Compute Cloud (EC2) instance is launched
using that AMI. The previous instance is terminated.
This ensures that every EC2 instance is identical, and the deployment process is fully automated.
There is no need to SSH into a server to apply manual fixes — any fix is made at the image level
and redeployed cleanly.
Docker Containers
Docker is a core technology in immutable infrastructure. A Docker image captures the complete
application environment: the base operating system layer, system libraries, dependencies, and
application code. Once built, the image becomes read-only and cannot be modified.
When an update is required, the image is rebuilt and redeployed as a new container. This
immutability enhances portability, simplifies debugging, and guarantees consistent behavior
across development, testing, and production environments.
Kubernetes Deployments
In Kubernetes, workloads are deployed as immutable pods created from container images.
Deploying a new version of an application does not involve patching existing pods; instead, they
are replaced with new instances built from updated container images.
Kubernetes handles this through features like rolling updates, ensuring zero downtime while
replacing old immutable pods with new ones. This model aligns with the core DevOps principle of
automated, predictable deployments.
CI/CD Pipelines with Immutable Artifacts
Modern CI/CD systems such as GitLab CI, Jenkins, and GitHub Actions often generate immutable
artifacts during the build process. These artifacts — such as compiled binaries, Docker images, or
configuration bundles — are versioned, stored in registries, and deployed as-is to production.
Instead of modifying the live system, the pipeline always delivers a fresh version of the
application, known to be good and up to date, thus ensuring that production environments are
consistent and reproducible.

Loose Coupling
Another essential property of cloud-native applications is loose coupling. In a tightly coupled
system, components are highly dependent on one another, making them difficult to change, scale,
or replace. Changes to one part of the system often require corresponding changes elsewhere,
increasing complexity and reducing agility.
Loose coupling addresses this problem by minimizing dependencies between services. Each
component of a loosely coupled system interacts with others through well-defined interfaces and
contracts, such as RESTful APIs or asynchronous messaging protocols. This decoupling allows
services to evolve independently, be developed and deployed by separate teams, and scale based
on their own demand.
Microservices architecture is a common implementation of loose coupling. In this model, the
application is broken into independent services that communicate over the network. Service
discovery, API gateways, and message brokers like Kafka or RabbitMQ are often used to facilitate
communication between services without creating tight interdependencies.
Loose coupling enhances system resilience. If one service fails, the others can continue
functioning, possibly with degraded performance but without complete system failure. This
design supports fault isolation and graceful degradation, which are critical in distributed systems.
Moreover, loose coupling promotes reuse and composability. Services can be repurposed in
different contexts, integrated with other applications, or replaced with alternative
implementations without disrupting the entire system. Loose coupling also enables faster
innovation, as teams can iterate on individual services without waiting for changes in other parts
of the application.
To achieve effective loose coupling, developers and architects must prioritize clear API design,
robust service contracts, and comprehensive documentation. Monitoring, tracing, and
observability tools are also necessary to understand how services interact and to diagnose issues
when they arise.

Test-Driven Development (TDD)
Test-driven development (TDD) is not exclusive to cloud-native applications, but it is particularly
valuable in this context. TDD is a software development approach where tests are written before
the actual code. The process typically follows a short cycle: write a test that naturally fails because
no code is present to support it, then implement the minimal code to pass the test, and finally
refactor the code for clarity and performance.
In cloud-native systems, TDD supports reliability, maintainability, and rapid iteration. Since

applications are composed of many small, independent services, testing each component in
isolation is crucial. TDD ensures that every unit of functionality is backed by automated tests,
which catch regressions and validate behavior during every deployment.
TDD also aligns well with continuous integration and continuous delivery. CI/CD pipelines rely on
automated tests to validate code changes before they are merged or deployed. When TDD is
adopted, the test suite becomes a safety net that allows teams to move quickly without sacrificing
quality.
Several types of tests are relevant to TDD in cloud-native development:
Unit tests
validate individual functions or classes.
Integration tests
ensure that components work together correctly.
End-to-end tests
simulate real user interactions with the system.
Each layer of testing contributes to overall confidence in the application’s correctness.
Modern development tools and frameworks facilitate TDD. Modern languages such as Python, Go,
Ruby, Rust, C#, and JavaScript offer robust testing libraries. Containerized testing environments
can simulate production-like conditions, while service virtualization can mock dependencies.
These capabilities make it easier to practice TDD in distributed, containerized systems.
Beyond technical implementation, TDD encourages a mindset of intentional design. Writing tests
first forces developers to clarify requirements and think about how the code will be used. It
promotes modularity, reduces technical debt, and improves documentation.

Service-Oriented Architecture (SOA)
As modern applications become increasingly complex and distributed, the need for modularity,
scalability, and flexibility in software design has become critical. Traditional monolithic
architectures, where all components of an application are tightly interwoven and deployed as a
single unit, often struggle to meet these demands. In response, service-based application design
has emerged as a powerful architectural paradigm, enabling systems to be built from loosely
coupled, independently deployable components that communicate over well-defined interfaces.
One of the foundational models in this domain is service-oriented architecture (SOA). SOA
promotes the organization of software functionality into discrete services, each of which

encapsulates a specific business capability and interacts with others through standardized
protocols. Understanding how to design applications based on services, and the principles behind
SOA, is essential for professionals building modern, scalable, and maintainable systems.

What is a Service-Based Application?
A service-based application is a system built from a collection of independent services, each
responsible for a specific piece of functionality. These services interact with each other over a
network using well-defined interfaces, often through common web protocols such as HTTP, Simple
Object Access Protocol (SOAP), or gRPC Remote Procedure Calls (gRPC).
Each service in the system represents a cohesive business unit, such as payment processing, user
authentication, or inventory management. Unlike components in a monolithic application,
services can be developed, deployed, and scaled independently. This decoupling allows teams to
evolve parts of the system without affecting the entire application.
Service-based applications offer better fault isolation, improved scalability, and more flexibility in
choosing programming languages, frameworks, or databases for individual services. They also
support distributed development, where different teams can own and operate separate services.

What is Service-Oriented Architecture (SOA)?
Service-oriented architecture (SOA) is a software design approach in which application
components provide services to other components via a communication protocol, typically over a
network. The key principle of SOA is that services are loosely coupled and designed to be reusable
and composable.
In SOA, services expose contract-based interfaces that describe what the service does, how it
should be invoked, and what data formats it expects. These interfaces are often described using
formal specifications, such as Web Services Description Language (WSDL) for SOAP-based services.
Communication between services is handled via message exchange patterns, often formatting the
data payloads through Extensible Markup Language (XML) or JavaScript Object Notation (JSON).
SOA emerged as a response to the challenges of tightly coupled systems and was intended to
increase modularity, interoperability, and maintainability. It is particularly well-suited for
enterprise systems requiring integration between multiple, heterogeneous systems.
Service-Oriented Architectures have several defining characteristics that distinguish them from
monolithic or layered architectures.
First, services in SOA are autonomous. Each service runs independently and has control over the
logic and data it manages. This autonomy reduces dependencies and simplifies system evolution.

Second, SOA emphasizes standardized communication. By using agreed-upon protocols and data
formats, services can interact regardless of their internal implementation. This is especially
important in large organizations where services may be written in different programming
languages or run on different platforms.
Third, services are discoverable and reusable. SOA systems often include a service registry, where
available services are published and can be discovered by consumers. This enables reuse and
avoids duplication of functionality across the enterprise.
Finally, SOA promotes composability. Complex workflows or applications can be built by
combining several services, using either orchestration engines or choreography patterns.
Composability supports agility and makes it easier to modify business processes as requirements
evolve.

SOA vs. Microservices
While SOA and microservices share many principles — such as modularity, reusability, and loose
coupling — they differ in scope and implementation.
SOA tends to focus on integration at the enterprise level, often involving large, complex systems
that need to communicate across organizational or technological boundaries. It commonly uses
middleware such as an enterprise service bus (ESB) for message routing, message transformation,
and orchestration.
Microservices, on the other hand, are typically more lightweight and granular, with an emphasis
on autonomy and decentralized governance. In microservices, each service is deployed
independently, often packaged in containers, and managed through DevOps practices such as
continuous delivery, infrastructure as code, and service meshes.
Despite these differences, SOA laid the groundwork for many of the architectural patterns now
widely adopted in microservices and cloud-native environments.

Benefits and Challenges of SOA
SOA offers a number of benefits for organizations aiming to improve agility and system
maintainability:
Service reuse
Once a service is developed and exposed, it can be reused across multiple applications,
reducing development time and redundancy.

Interoperability
Because SOA services use open standards and protocols, they can bridge systems that run on
different platforms or are written in different programming languages.
Scalability and fault tolerance
Services can be deployed independently and scaled according to demand. If one service fails,
others can continue functioning, reducing the risk of system-wide outages.
However, SOA also introduces challenges. Designing effective service boundaries requires careful
analysis, and service orchestration can become complex. Additionally, the use of shared
infrastructure such as ESBs may introduce performance bottlenecks or single points of failure.
Monitoring, logging, and tracing across services become more critical — and more difficult — as
the number of services grows. Organizations adopting SOA must invest in tooling and practices
that provide visibility into service interactions and health.

Designing Software to be Deployed to Cloud Services
Designing a service-based application to be deployed to cloud services begins with identifying the
business capabilities the system must provide and mapping these to individual services. Each
service should have a single, clearly defined responsibility and operate independently of others as
much as possible. Good service design also includes well-documented APIs, versioning strategies,
and robust error handling.
A common design approach builds services around business domains, a concept known as
domain-driven design. For example, an e-commerce platform might have services such as
OrderService, PaymentService, and ShippingService. Each of these services represents a domain
and encapsulates its data and logic.
It’s important to manage data ownership boundaries carefully. In SOA, each service typically
“owns” its data and exposes only what is necessary through its interface. Shared databases
between services are discouraged, as they create tight coupling and make services harder to
evolve independently.
Communication between services can be synchronous (e.g., HTTP or gRPC) or asynchronous (e.g.,
message queues or event streams). Asynchronous communication allows services to remain
decoupled and improves system resilience and scalability.
Another important consideration is service orchestration. In some systems, a central orchestrator
is responsible for invoking services in a specific sequence. In others, services are designed to
collaborate through an event-driven architecture, where services react to published events and

trigger their own logic.
In the cloud, applications are no longer bound to a specific physical server; instead, they run in
virtualized or containerized environments, often orchestrated by tools such as Kubernetes and
managed through infrastructure-as-code.
To design effectively for the cloud, applications must be stateless whenever possible. This means
they should not rely on local disk or session data, because instances may be replaced, scaled, or
restarted at any time. Instead, persistent data should be stored in external services like object
storage (e.g., AWS S3) or managed databases (e.g., Azure SQL, Amazon RDS).
Another key consideration is scalability. Applications should be designed to scale horizontally,
meaning they can handle increased load by adding more instances, rather than scale vertically by
upgrading a single server. This includes designing APIs and workloads that support load
balancing and auto-scaling.
Cloud-deployed software must also embrace observability and resilience. Logs, metrics, and traces
should be collected and centralized using tools such as Prometheus, Grafana, ELK Stack, or
CloudWatch. For resilience, patterns such as circuit breakers, retry logic, and graceful degradation
are essential to handle failures gracefully.
Security is built into cloud design from the start: secrets management, identity and access control,
and network segmentation (e.g., via VPCs and security groups) are critical. It’s also common to
integrate with CI/CD pipelines to automate builds, tests, and deployments, ensuring faster and
safer delivery of updates.
By following these principles, software becomes cloud-ready: able to take full advantage of the
scalability, flexibility, and automation that modern cloud platforms provide.

## 1. What are the key properties of cloud-native applications, and why are they important for
building scalable and maintainable systems?

## 2. Explain the concept of immutable servers and give one example of how this concept is
implemented in practice.

## 3. What is service-oriented architecture (SOA), and how does it support modularity and system
evolution?

## 1. Based on the description of SOA in this lesson, research how microservices architectures build
upon or diverge from traditional SOA.

## 2. Test-driven development (TDD) is mentioned as an important practice for cloud-native
applications. Research and list at least two popular tools or frameworks used for implementing
TDD in cloud-native environments (e.g., container-based or CI/CD-enabled workflows).

As organizations embrace cloud environments, cloud-native design has become essential for
building scalable, resilient, and modern applications. This lesson introduced the core properties of
cloud-native systems, including immutable servers, loose coupling, and test-driven development
(TDD). Through containerization, orchestration, and automation, cloud-native applications
support continuous delivery and seamless scalability. Immutable infrastructure ensures that
deployments are repeatable and consistent, reducing human error and simplifying rollback.
The lesson also explored the design of service-based applications, with a focus on service-oriented
architecture (SOA). SOA provides a modular framework for building applications from
independent, discoverable services that interact over standard protocols. This approach improves
fault isolation, promotes reuse, and allows teams to iterate on individual components without
affecting the whole system.

## 1. What are the key properties of cloud-native applications, and why are they important for
building scalable and maintainable systems?
The key properties of cloud-native applications include immutable servers, loose coupling, and
test-driven development (TDD). These properties are important because they support
resilience, scalability, and maintainability. Immutable servers ensure consistency and reduce
errors by preventing manual changes. Loose coupling allows independent development and
deployment of components, enhancing agility. TDD ensures code reliability and supports rapid
iteration by requiring automated tests before implementation.
2. Explain the concept of immutable servers and give one example of how this concept is
implemented in practice.
Immutable servers are systems that are never modified after deployment. Instead of applying
changes directly to a running server, a new instance is created from a tested, versioned image.
This ensures consistency and simplifies rollbacks.
Example: In AWS, teams use Amazon Machine Images (AMIs) to build and deploy EC2
instances. When an update is required, a new AMI is created, a new EC2 instance is launched,
and the old one is terminated.
3. What is service-oriented architecture (SOA), and how does it support modularity and system
evolution?
SOA is a design approach where software is organized into autonomous services that
communicate over standard protocols like HTTP or SOAP. Each service encapsulates a specific
business capability and exposes contract-based interfaces. This modular structure supports
reusability, interoperability, and scalability. Because services are loosely coupled, they can
evolve independently, making the system easier to maintain and adapt to changing
requirements.

## 1. Based on the description of SOA in this lesson, research how microservices architectures build
upon or diverge from traditional SOA.
While both SOA and microservices architectures focus on modular, reusable services,
microservices tend to be more fine-grained, with each service typically managing a single
function. Microservices emphasize independent deployment, lightweight communication
protocols (like REST or gRPC), and decentralized governance, whereas SOA often relies on
centralized components such as enterprise service buses (ESBs) and WSDL contracts for SOAP
services.
2. Test-driven development (TDD) is mentioned as an important practice for cloud-native
applications. Research and list at least two popular tools or frameworks used for implementing
TDD in cloud-native environments (e.g., container-based or CI/CD-enabled workflows).
Test-driven development (TDD) is widely supported in cloud-native environments through a
variety of tools that integrate seamlessly with containers and CI/CD pipelines. For example,
Pytest is a popular Python testing framework known for its simplicity and extensibility, easily
executed within Docker containers and CI tools such as GitHub Actions or GitLab CI. In the
JavaScript ecosystem, Jest stands out for its speed and built-in features like mocking and
snapshot testing, making it ideal for both frontend and backend services.

As software systems evolve to meet the demands of cloud-native environments, containerization
has become foundational to modern application design. Containers offer a consistent and
lightweight runtime that simplifies deployment, enhances portability, and enables rapid scaling
across diverse infrastructure. To fully benefit from containers, software must be designed with
distributed principles in mind: statelessness, modularity, and clear service boundaries.
This shift often goes hand-in-hand with adopting a microservices architecture, RESTful APIs, and
cloud-optimized storage and session management strategies. This lesson explores how
applications can be architected to run effectively in containers, communicate reliably through
APIs, and remain robust and maintainable in dynamic, production-ready environments.

Microservices Architecture
A common architectural pattern for containerized applications is the microservices architecture.
Instead of building one large, monolithic application, microservices break functionality into small,
independent services that can be developed, deployed, and scaled separately. Each microservice is
typically packaged in its own container and managed through orchestration platforms such as

Kubernetes or Docker Swarm. This approach enhances modularity, supports team autonomy, and
enables faster, more reliable software delivery.
However, migrating from a monolithic legacy application to a microservices-based, containerized
system presents several risks. Legacy applications are often tightly coupled, with shared databases
and hidden dependencies, making it challenging to separate functions cleanly. Migration efforts
can introduce data consistency issues, service duplication, or unexpected behavior during
integration. Additionally, without a clear understanding of the legacy system’s architecture and
business rules, breaking it into services may lead to loss of functionality or degraded
Organizations must approach this transition carefully, starting with modular refactoring,
implementing APIs to wrap existing functionality, and introducing containerization
incrementally. It’s also essential to invest in observability tools, CI/CD pipelines, and automated
testing to support the increased complexity of a distributed system. With proper planning,
containerized microservices can bring agility and resilience. But it’s critical to remain aware of
migration risks to ensure a smooth and successful transformation.
We’ve come a long way in how we build and structure software. It all started with monolithic
architectures — everything bundled together — which were simple but hard to scale or maintain
as things got bigger. Then came Service-Oriented Architecture, which helped break things down
into more manageable services that could talk to each other. It was a big step forward.
And now, we are in the age of microservices, taking modularity even further with small,
independent services that can be developed, deployed, and scaled on their own. Unlike SOA,
microservices avoid the complexity of enterprise service buses and focus on lightweight
communication like REST or messaging, giving teams more autonomy and speed.
Each step in this evolution has been about making systems more flexible, scalable, and easier to
work with.
To take full advantage of containerization, applications should be designed to be stateless, support
environment configuration via variables, and expose well-defined network interfaces such as
RESTful APIs.

Common API Concepts and Standards: REST and JSON
Modern software systems rely heavily on application programming interfaces (APIs) to enable
communication between different services, applications, and platforms. APIs define a set of rules
that allow one piece of software to interact with another, making them a foundational component
in cloud-native and service-based architectures.

One of the most common API styles is representational state transfer (REST). REST is an
architectural standard for designing stateless APIs that use standard HTTP methods such as GET,
POST, PUT, DELETE, and PATCH to perform operations on resources.
In RESTful APIs, data is typically represented as resources, each identified by a unique URL. For
example, an API request like GET /users/123 might return the profile information of a specific
user.
REST APIs are popular because they are simple, scalable, and language-agnostic — any client that
can make HTTP requests can use them. They also follow predictable conventions, making them
easy to understand and consume by developers.
In RESTful APIs, different HTTP methods are used for different actions that a client wants to
perform on a resource, such as retrieving, creating, updating, or deleting data, as described in the
following subsections.

GET: Retrieve Data
The GET method retrieves data from a server. It is safe and idempotent, meaning that repeating
the same request will always result in the same state of the resource. GET should have no side
effects on the resource. In RESTful APIs, GET is commonly used to fetch a list of resources or a
specific resource by ID.
Example of retrieving a list of users:
$ GET /api/users

Retrieving a single user by ID:
$ GET /api/users/42

These requests return data in formats such as JSON or XML and should not modify any data on the
server.

POST: Create a New Resource
The POST method creates a new resource on the server. Unlike GET, POST is not idempotent,
meaning that multiple identical requests may result in multiple resources being created. The
resource to be created is specified in the body of the request, usually formatted as JSON.

Example of creating a new user:
$ POST /api/users

Request body:
"name": "Carol",
"email": "carole@example.com"

The server processes this request and, if successful, responds with a 201 Created status and the
URI of the new resource in the Location header.

PUT: Update or Replace a Resource
The PUT method completely updates or replaces an existing resource. It is idempotent.
Example of updating a user:
$ PUT /api/users/42

Request body:
"name": "Carol Smith",
"email": "Carol.smith@example.com"

If the user with ID 42 exists, this request replaces the user’s entire record with the new data. If
some fields are omitted from the request, those fields in the record may be reset or removed
depending on the implementation.

DELETE: Remove a Resource
The DELETE method removes a resource from the server. It is also idempotent: deleting the same
resource multiple times has the same effect as deleting it once.
Example of deleting a user:

$ DELETE /api/users/42

The server typically responds with a 204 No Content status code if the deletion is successful and
the resource no longer exists.

PATCH: Partially Update a Resource
The PATCH method applies a partial update to an existing resource. Unlike PUT, which replaces the
entire resource, PATCH changes only the fields specified in the request.
Example of updating only the user’s email address:
$ PATCH /api/users/42

Request body:
"email": "new.email@example.com"

The PATCH method is particularly useful for applying partial updates to a resource, allowing
minimal changes to be made without transmitting its entire representation. This reduces
bandwidth usage and avoids unnecessary overwriting of unchanged data.
Understanding and using these methods correctly is fundamental when designing or consuming
RESTful APIs, especially in DevOps environments where automation, versioning, and
standardization are key. These methods help create consistent, maintainable, and predictable
interfaces for service-based applications.

Formatting Data in RESTful APIs
In RESTful APIs, the most common data format used to send and receive information is JavaScript
Object Notation (JSON). JSON is a lightweight, human-readable data format that is easy to parse
and generate in virtually every programming language. For example, a response from an API
might represent a user’s ID, name, and email address through the following JSON:
"id": 123,
"name": "Henry Jobs",

"email": "henryj@example.com"

JSON structures data using key-value pairs, arrays, and nested objects, making it ideal for
representing complex data in a compact form. It is often used alongside REST because it allows
fast, efficient communication between services — especially in microservices and cloud-based

Example of RESTful APIs
Instead of designing a single monolithic application, the platform is decomposed into smaller,
independent microservices. Each service owns a specific business capability (for example, catalog,
orders, payments, shipping) and exposes well-defined APIs or publishes/consumes messages via
message queues to collaborate asynchronously.
This modular architecture improves deployment agility (services can be updated independently),
fault isolation (a failure in one service does not bring down the entire system), and scalability
(each service scales according to its own workload profile). Clear service boundaries, versioned
contracts, and automated pipelines further streamline development and operations while
preserving autonomy across teams and services.
Here’s how the system might be structured:
1. User Service
- Handles user registration, authentication, and profile management.
- Offers requests like POST /register, POST /login, and GET /profile/{id}.
- Stores user data in its own isolated database.
- Responsible for issuing JWT tokens for authentication or API keys for secure
communication.
2. Product Catalog Service
- Manages all product information: names, descriptions, prices, images, and availability.
- Provides requests such as GET /products, GET /products/{id}, and POST /products.
- Keeps product metadata in a separate product database.
- Allows internal updates by administrators and public browsing by customers.
3. Cart Service
- Manages shopping cart functionality for each user.

- Allows items to be added, updated, or removed through requests like POST /cart/add or
DELETE /cart/item/{id}.
- Stores cart data temporarily, often in a fast-access data store like Redis.
4. Order Service
- Processes completed carts into orders.
- Handles order creation, payment status, and tracking.
- Communicates with both the Cart and Payment services.
- Stores order history and generates order confirmations.
5. Payment Service
- Integrates with external payment gateways (e.g., Stripe, PayPal).
- Validates transactions and updates payment status.
- Provides secure endpoints such as POST /payment/process, which forwards payment
details to the selected gateway and returns the transaction result.
- Does not store sensitive payment information directly, but relies on third-party providers
for PCI compliance.
6. Shipping Service
- Coordinates delivery logistics and estimated delivery times.
- Integrates with external shipping APIs (e.g., FedEx, UPS).
- Provides tracking numbers and delivery status updates.
- Can trigger notifications through the Notification Service.
7. Notification Service
- Sends email messages, SMS messages, or push notifications to users about order status,
promotions, or support tickets.
- Can be triggered by other services via events or API calls.
Together, these services illustrate a modular and scalable approach to building a RESTful
application using a microservice architecture. Each service is responsible for a specific domain,
exposes well-defined API endpoints, and maintains its own data store. This architecture enables
loose coupling, independent deployment, and improved maintainability. By separating concerns
and using standard HTTP methods, the system ensures clear communication between services
and provides a reliable foundation for delivering a responsive, secure, and extensible user
experience.

Data Storage, Service Status, and Session Handling in Cloud
Applications
Understanding how data is stored, how services manage their status, and how sessions are
handled is essential when designing modern, distributed applications — especially in servicebased or cloud-native environments. Each of these aspects plays a critical role in ensuring that
applications remain reliable, scalable, and responsive under real-world conditions.

Data Storage
A key principle in data storage is data ownership. Each service in a distributed system should be
responsible for its own data, maintaining its own database or data store. This approach
contributes to loose coupling between services and makes it possible to scale and evolve
individual components without introducing dependencies.
Additionally, services may use different types of storage based on their requirements. For
example, a product catalog service might use a relational database for structured queries, while a
notification service might use a key-value store or a message queue for high-throughput
processing.
Modern architectures also rely on high-availability storage systems, replication, and backups to
ensure data resilience in case of failure.
In cloud environments, data storage is offered through a wide range of services, each designed to
meet specific requirements for performance, durability, and scalability.
One of the most widely used types is object storage, such as Amazon S3. It allows applications to
store and retrieve unstructured data — such as images, videos, backups, or logs — using unique
identifiers. S3 is highly durable, supports versioning, and integrates easily with other AWS
services. Similar offerings include Azure Blob Storage and Google Cloud Storage.
For structured and relational data, cloud providers offer managed database services such as
Amazon RDS (Relational Database Service), which supports engines such as MySQL, PostgreSQL,
SQL Server, and Oracle Database. These services handle routine tasks like backups, patching,
replication, and failover, allowing DevOps teams to focus on application logic rather than
database maintenance. Google Cloud SQL and Azure Database provide similar capabilities in their
respective ecosystems.
In use cases that require low latency and high throughput for semi-structured or unstructured
data, NoSQL databases are often preferred over relational (SQL-based) databases. Amazon
DynamoDB is a fully managed key-value and document database designed for high-performance

workloads. Similarly, Azure Cosmos DB and Google Firestore offer globally distributed,
horizontally scalable storage solutions for applications that require real-time responsiveness at
scale.
For temporary or fast-access storage, such as caching or session storage, services like Amazon
ElastiCache (which supports Redis and Memcached) offer in-memory data storage with
microsecond response times. These services are ideal for reducing the load on backend systems
and improving application performance.
File storage is another important storage category, particularly for applications that require
shared access to a file system. Services like Amazon EFS (Elastic File System), Azure Files, and
Google Filestore provide scalable and secure file systems that can be mounted on virtual machines
or containers across availability zones.
These examples highlight how cloud providers deliver flexible, reliable, and scalable data storage
options to suit a wide variety of application requirements. Choosing the right type of storage
depends on factors such as data access patterns, consistency requirements, performance
expectations, and cost constraints.

Service Status
Service status refers to services communicating their health and availability to other parts of the
system. Monitoring service status is critical for system reliability, automated scaling, and incident
response. Health checks — both liveness and readiness probes — are commonly used in
orchestration platforms such as Kubernetes to detect whether a service is functioning correctly
and is ready to receive traffic. Service registries and load balancers may use these checks to route
traffic away from unhealthy instances, ensuring that clients try to connect only to responsive
services. Moreover, exposing service metrics, logs, and tracing information allows real-time
observability and pro-active incident detection.

Session Handling
Session handling is another crucial component in distributed systems, especially for applications
that require user authentication or that maintain temporary user-specific state. In monolithic
applications, session data is often stored in memory. However, in distributed service-based
applications, storing sessions locally can cause inconsistencies and hinder scalability, particularly
when multiple service instances or containers are running behind a load balancer. To address this
gap in availability, sessions are typically stored in centralized, fast-access data stores such as Redis
or Memcached, allowing any service instance to retrieve session information as needed.
Alternatively, stateless authentication methods, such as JSON Web Tokens (JWT), can be used to

encode session data on the client side, reducing server-side dependencies and improving
horizontal scalability.
Effective data storage, service status monitoring, and session management work together to form
the backbone of robust service-based applications.

Database Schema Updates and Migrations
Another critical aspect of data management in service-based architectures is the handling of
database schema updates and migrations.
In traditional monolithic systems, schema changes are typically applied centrally and deployed
alongside application updates. However, in distributed systems — especially those built with
microservices — schema management becomes more complex, as each service may have its own
database and update cycle.
Database migrations must be carefully coordinated, especially when changes are applied to
production environments with live traffic. A common best practice is to design backwardcompatible migrations, ensuring that new schema versions can work with both the current and
previous versions of the application. This allows teams to roll out database changes gradually
without causing service disruptions.
In DevOps workflows, database migrations should be treated as first-class citizens within the
deployment process. This means applying schema updates as part of the release pipeline, testing
them in staging environments, and monitoring their post-deployment effects. In environments
where downtime is unacceptable, zero-downtime migration techniques — such as additive
changes, blue-green deployments, and feature toggles — are employed to ensure smooth
transitions.
Being aware of the implications of schema changes, and implementing migrations safely and
consistently, is essential for maintaining data integrity and minimizing operational risk in modern
applications. The procedure requires collaboration between developers, database administrators,
and operations teams to ensure that data and applications evolve together, without breaking
functionality or causing unexpected outages.

NOTE

For readers interested in diving deeper into cloud-native design principles, it’s
highly recommended to explore the concept of the 12-Factor App. It outlines
foundational practices for building scalable, maintainable, and portable
applications in modern cloud environments.

## 1. Design a simple user registration microservice that follows stateless principles and is suitable
for deployment in a containerized environment. Describe the API endpoints it would expose,
how it would handle session management, and how data would be stored.

## 2. You are managing a microservice that uses a PostgreSQL database. A new feature requires
adding a column to a table used in production. Describe how you would implement this schema
change safely with zero downtime.

3. You are deploying multiple instances of a microservice behind a load balancer in Kubernetes.
Describe how the system should handle service health checks to ensure that traffic is routed
only to healthy instances.

## 1. The lesson introduces Kubernetes as an orchestration platform for managing containerized
microservices. Choose a real-world company or open-source project that uses Kubernetes, and
describe how it manages application deployment, scaling, and service discovery.

## 2. Describe a secure way to implement authentication and authorization in a RESTful API. Include
how the API should validate client identity, restrict access to protected resources, and ensure
that data is transmitted securely. Mention at least one standard method or technology used for
this purpose.

This lesson introduced key concepts for designing modern, distributed applications that run in
containers. It explored how containerization supports portability and scalability, and how a
microservices architecture enables independent development, deployment, and scaling of loosely
coupled services. Through the use of RESTful APIs, services communicate over well-defined
interfaces using standard HTTP methods such as GET, POST, PUT, DELETE, and PATCH, enabling
modular and predictable interactions between components.
Additionally, the lesson covered essential operational concerns, including data storage strategies
in cloud environments, service health monitoring, and session handling in distributed systems.
Special attention was given to database schema updates and migrations, highlighting the
importance of careful planning and automation. Together, these practices form the foundation for
building resilient, maintainable, and scalable applications in DevOps and cloud-native

## 1. Design a simple user registration microservice that follows stateless principles and is suitable
for deployment in a containerized environment. Describe the API endpoints it would expose,
how it would handle session management, and how data would be stored.
A stateless user registration microservice could expose a /register endpoint that accepts a
POST request with JSON-formatted user data, such as name, email, and password. Upon
receiving the request, the service would validate the input, hash the password, and store the
user data in its own relational database (e.g., PostgreSQL). It would return a 201 Created
status with the new user ID. The service would not store session data locally. Instead, it would
issue a JSON Web Token (JWT) to the client, which the client can present in subsequent
requests to other services.
2. You are managing a microservice that uses a PostgreSQL database. A new feature requires
adding a column to a table used in production. Describe how you would implement this schema
change safely with zero downtime.
To perform a zero-downtime migration, the new column should be added to the table using an
additive schema change that does not interfere with existing operations. For example, an
ALTER TABLE command can be used to add the column with a default value or set it as
nullable. The application code should then be updated to begin writing data to the new column
while continuing to read from the original structure. After confirming that the updated code is
functioning correctly in production, existing data can be gradually migrated to populate the
new column, potentially using background jobs or batch processes. Once all clients are verified
to be using the new structure, the old column can be safely removed in a later release.
3. You are deploying multiple instances of a microservice behind a load balancer in Kubernetes.
Describe how the system should handle service health checks to ensure that traffic is routed
only to healthy instances.
In a Kubernetes environment, define both liveness and readiness probes in the deployment
configuration for the microservice. The liveness probe checks whether the application is still
running and capable of recovering, while the readiness probe determines whether the instance
is ready to receive traffic. The load balancer would rely on the readiness probe to decide
whether to forward requests to a given pod. If the readiness check fails — for example, due to
initialization errors or dependency failures — Kubernetes would temporarily remove that
instance from the service endpoints. The probes might target an internal health endpoint such
as /healthz that performs lightweight checks on service status and database connectivity. This
setup ensures that only healthy, fully initialized instances handle live traffic, reducing the risk
of failed requests and improving service reliability.

## 1. The lesson introduces Kubernetes as an orchestration platform for managing containerized
microservices. Choose a real-world company or open-source project that uses Kubernetes, and
describe how it manages application deployment, scaling, and service discovery.
Spotify is a well-known example of a company that uses Kubernetes to manage its
microservices infrastructure. With hundreds of services running, Spotify uses Kubernetes to
schedule containers across clusters, scale services automatically based on resource metrics,
and manage rolling updates with zero downtime. Service discovery is handled through
Kubernetes’s built-in DNS system, allowing services to find each other by name. Spotify also
integrates Kubernetes with internal CI/CD pipelines to enable frequent, automated
deployments. To ensure observability, they rely on tools such as Prometheus for monitoring
and Fluentd for log aggregation.
2. Describe a secure way to implement authentication and authorization in a RESTful API. Include
how the API should validate client identity, restrict access to protected resources, and ensure
that data is transmitted securely. Mention at least one standard method or technology used for
this purpose.
A common and effective way to secure a RESTful API is to use token-based authentication with
JSON Web Tokens (JWT). When a user logs in through a POST request to a /login endpoint, the
server verifies the credentials and responds with a cryptographically signed JWT. This token
contains encoded claims such as the user ID and roles, and is sent by the client in the
authorization header of each subsequent request using the bearer scheme. The API validates
the token signature on each request and checks the claims to determine whether the user is
authorized to access the requested resource. For example, a user with the “admin” role may
have access to DELETE /users/{id}, while a regular user may not. Additionally, the API
should be served over HTTPS to encrypt data in transit and prevent interception or tampering.
Rate limiting, input validation, and Cross-Origin Resource Sharing (CORS) policies can be used
to further protect the API from abuse or malicious input. Using standardized protocols along
with secure token handling ensures that RESTful APIs remain both user-friendly and resistant
to common security threats.

DevOps Tools Engineer (Version 2.0) | 701.2 Standard Components and Platforms for Software

### 701.2 Standard Components and Platforms for Software
DevOps Tools Engineer v2.0, Exam 701, Objective 701.2
- Features and concepts of object storage
- Features and concepts of relational and NoSQL databases
- Features and concepts of message brokers and message queues
- Features and concepts of big data services
- Features and concepts of computing services / IaaS
- Features and concepts of application runtimes / PaaS
- Features and concepts of hosted applications / SaaS
- Features and concepts of function applications / FaaS
- Features and concepts of content delivery networks
- Awareness of identity and access management in cloud services
- Objects, Buckets, ACLs, S3
- MariaDB, MySQL, PostgreSQL,
- Redis, MongoDB, InfluxDB
- Elasticsearch and OpenSearch

- Kafka, MQTT
- IAM

### 701.2 Standard Components and Platforms for
Software

As modern IT solutions evolve to embrace cloud-native architectures, containerization, and
service-oriented design, it becomes essential to understand the foundational infrastructure and
service models that support this ecosystem. From persistent storage and scalable compute
resources to real-time messaging and globally distributed content delivery, cloud technologies
provide the building blocks for deploying secure, efficient, and resilient applications at scale.
This lesson explores the core features and concepts behind a wide range of cloud-based
technologies and services. It begins with the principles of object storage. Then follows a
comparison of relational and NoSQL databases, highlighting their appropriate use cases in
microservice and big data architectures. The lesson then introduces message brokers and queues,
which facilitate asynchronous communication in distributed systems, and examines the role of
big data services in processing and analyzing high-volume datasets.

The lesson continues with the four primary cloud service models: Infrastructure as a Service
(IaaS), Platform as a Service (PaaS), Software as a Service (SaaS),and Function as a Service (FaaS).
The lesson concludes with an overview of content delivery networks (CDNs). These topics equip
professionals with the conceptual tools needed to design, deploy, and operate modern
applications that are high-performing, secure, and cloud-ready.

Features and Concepts of Object Storage
Object storage is a fundamental component of modern, scalable infrastructure, particularly in
cloud-native environments and distributed systems. Unlike traditional file or block storage, object
storage manages data as discrete units called objects, each of which includes the data itself,
associated metadata, and a unique identifier. This structure allows for massive scalability and
efficient storage of unstructured data such as images, videos, backups, and logs.
Objects are organized within buckets, which serve as logical containers for grouping and
managing related data. Buckets are created and managed at the storage service level, and define
the namespace within which object keys must be unique. Each object can be accessed via a unique
URL constructed from the bucket name and object key, making integration with web-based or
distributed applications straightforward.
Access to object storage resources is governed by access control lists (ACLs) and sometimes more
advanced policy mechanisms. ACLs define who can read, write, or manage specific objects or
buckets. The ACLs can be applied at both the bucket and object levels, allowing fine-grained
control over data access. This flexibility is essential in multi-tenant environments or in systems
that require strict separation between public and private data.
A widely adopted implementation of object storage is Amazon S3 (Simple Storage Service), which
has become a de facto standard in the industry. S3 provides a RESTful API interface that allows
clients to perform operations such as uploading, retrieving, and deleting objects. It also supports
features such as versioning, lifecycle policies, server-side encryption, and multi-region replication.
The following table shows some storage solutions offered by popular cloud vendors.
Table 1. Storage solutions offered by popular cloud vendors

CLOUD STORAGE
Object Storage

Block Storage

File/Network Storage

Amazon

Amazon S3

Amazon EBS

Amazon EFS and FSx

Microsoft

Azure Blob Storage

Azure Disk Storage

Azure Files

Google

Cloud Storage

Persistent Disk

Filestore

Features and Concepts of Relational and NoSQL
Databases
In modern software architecture, understanding the strengths and use cases of both relational and
NoSQL databases is essential for selecting the right data storage strategy. These two categories
offer significantly different data modeling, query capabilities, performance characteristics, and
consistency guarantees, making them suitable for different application requirements.
Relational databases follow the structured model of tables with predefined schemas. Data is
organized in rows and columns (or fields), and relationships between entities are expressed
through foreign keys and joins. Relational databases are well-suited for applications requiring
transactional consistency, strong data integrity, and complex queries. They use Structured Query
Language (SQL) as the primary language for data manipulation and retrieval. Common features of
relational databases are ACID compliance, indexing, stored procedures, and robust replication
mechanisms.
Some of the most widely used relational databases in Open Source environments are MariaDB,
MySQL, and PostgreSQL. MariaDB and MySQL share a common ancestry and are often used
interchangeably. MariaDB, developed as a community-driven fork of MySQL, tends to include
newer features and performance enhancements.
PostgreSQL is recognized for its advanced capabilities, including full support for JSON data types,
powerful indexing options, extensibility through custom functions, and strict compliance with
SQL standards. PostgreSQL is often preferred in enterprise environments that require complex
data modeling and analytics.
In contrast to relational databases, NoSQL databases are designed to handle large volumes of
semi-structured or unstructured data with high availability and horizontal scalability. NoSQL is a
broad category that includes key-value stores, document databases, wide-column stores, and timeseries databases.
MongoDB is a widely adopted document-oriented database that stores data in flexible JSON-like
documents. It allows dynamic schemas, making it suitable for applications whose data model
evolves frequently or is not strictly defined up front. MongoDB is often used in content
management systems (CMS), user profile stores, and mobile application backends.
Redis is a high-performance in-memory key-value store commonly used for caching, session
management, and real-time analytics. Its low-latency access makes it ideal for reducing database
load and improving response times in web applications.
For time-series data such as monitoring metrics, sensor readings, and financial data, InfluxDB

offers specialized features such as retention policies, downsampling, and time-based queries. It is
optimized for fast ingestion and querying of chronological data and integrates well with
observability tools in DevOps pipelines.
For full-text search, log analysis, or real-time data exploration, technologies like Elasticsearch and
OpenSearch are commonly used. These engines index large volumes of textual data and support
advanced search queries, filtering, and aggregations. Elasticsearch, originally built on the Apache
Lucene library, has become a leading solution for search and analytics. OpenSearch, maintained
by an open source community under the guidance of AWS, is a fork of Elasticsearch and Kibana,
offering similar functionality with an open governance model. Both Elasticsearch and OpenSearch
are essential components in observability stacks such as the ELK (Elasticsearch, Logstash, Kibana)
or OpenSearch Dashboards.
The choice between relational and NoSQL solutions depends on application requirements;
different solutions are sometimes combined in a polyglot architecture. Systems that need strict
data integrity, complex joins, and transaction guarantees typically benefit from relational
databases. On the other hand, applications requiring horizontal scaling, flexible schemas, lowlatency reads, or full-text search capabilities are better served by NoSQL databases.

Features and Concepts of Message Brokers and
Message Queues
In distributed systems and service-based architectures, message brokers and message queues play
a vital role in enabling asynchronous communication, decoupling services, and increasing system
resilience. Rather than making direct API calls that are synchronous (that is, the service making
the call waits for the other service to respond), a message broker allows messages to be published
by one component and consumed by another, often at different times, and without requiring the
sender and receiver to be aware of each other’s presence or state. The sender publishes to a
channel and the recipients subscribe to that channel to receive the messages.
A message queue temporarily holds messages in a buffer until they are processed by consumers.
This pattern is essential for handling traffic spikes, balancing loads between services, and
improving fault tolerance. If a downstream service is unavailable or slow, messages can still be
queued, preventing the system from failing or becoming blocked. In addition to publish-subscribe
models, message brokers also support routing, message filtering, and persistence, depending on
the architecture and use case.
One of the most widely used technologies in this space is Apache Kafka, a distributed event
streaming platform designed for high-throughput, low-latency data pipelines. Kafka uses a logbased architecture, where messages (events) are written to topics, and consumers can read from

those topics in real time or at their own pace. Kafka is fault-tolerant, horizontally scalable, and
suitable for use cases such as real-time analytics, log aggregation, metrics collection, and
asynchronous communication between microservices. Its support for message retention,
partitioning, and consumer groups makes it ideal for building decoupled and reactive systems
that process massive volumes of data.
For lightweight communication between IoT devices or systems with constrained resources,
Message Queuing Telemetry Transport (MQTT) has been widely adopted. MQTT is a simple,
efficient, and low-bandwidth publish-subscribe messaging protocol designed for devices that have
limited connectivity or computational power. It is commonly used in smart sensors, telemetry
systems, and home automation.
Both Kafka and MQTT serve as examples of how message-oriented middleware can be used to
create scalable, fault-tolerant, and flexible systems.

Features and Concepts of Big Data Services
Big data services are designed to process, store, and analyze extremely large and complex datasets
that exceed the capabilities of traditional database systems. These services enable organizations to
gain insights from vast volumes of structured, semi-structured, and unstructured data collected
from a variety of sources, including logs, sensors, transactions, user behavior, and social media
streams. Big data platforms typically support high-throughput data ingestion, scalable storage,
and parallel processing frameworks that can handle petabytes of information in distributed
One of the core concepts in big data architectures is the separation of storage and computation.
Data is often stored in distributed file systems such as Hadoop Distributed File System (HDFS), or in
object storage like Amazon S3 or Azure Data Lake. These data stores are then accessed by compute
engines such as Apache Spark and Presto to perform transformations, aggregations, and analytics
on demand.
These systems scale horizontally by distributing processing tasks across many computer systems
or nodes, guaranteeing performance and reliability even under heavy loads. Big data services
often support batch processing for historical analysis as well as stream processing for real-time
analytics. Big data services also frequently integrate with machine learning frameworks and
support SQL-like interfaces for accessibility.

Features and Concepts of Computing Services: IaaS
Infrastructure as a Service (IaaS) is a fundamental model of cloud computing that provides

virtualized computing resources over the internet. IaaS allows organizations to provision and
manage infrastructure components such as virtual machines (VMs), storage volumes, and
network configurations without the need to purchase or maintain physical hardware. This
approach offers high flexibility and scalability, enabling developers and system administrators to
deploy applications on demand and adapt quickly to changing workloads. Popular IaaS providers
include Amazon EC2, Microsoft Azure Virtual Machines, and Google Compute Engine.
A key feature of IaaS is the ability to provision resources programmatically via APIs or
infrastructure-as-code tools like Terraform, Ansible, or CloudFormation. This allows teams to
automate the creation, scaling, and teardown of virtual infrastructure as part of their CI/CD
pipelines. IaaS platforms also offer options for autoscaling, load balancing, and high availability
across multiple zones or regions. These capabilities are critical for ensuring application resilience
and performance under variable traffic conditions. Additionally, users can select from a wide
range of instance types optimized for compute, memory, storage, or GPU workloads.
IaaS services often integrate with other cloud-native components such as object storage, identity
management, security groups, and monitoring tools. This ecosystem enables a full-stack
operational model where compute resources are just one part of a broader platform.

Features and Concepts of Application Runtimes: PaaS
Platform as a Service (PaaS) is a cloud computing model that provides a ready-to-use environment
for deploying, running, and managing applications without the complexity of managing the
underlying
PaaS
solutions
offer
developers
core
runtime
components — including operating systems, programming language runtimes, web servers, and
application frameworks — alongside integrated services such as databases, messaging, and
authentication. This abstraction accelerates development workflows and allows teams to focus
entirely on writing and delivering code.
A central feature of PaaS is its support for automated deployment and scaling. Developers
typically deploy applications by pushing source code or containers to the platform, which then
handles the rest: building, provisioning, routing, and scaling as needed. Services such as Heroku,
Google App Engine, Azure App Service, and Red Hat OpenShift allow teams to deploy web
services, APIs, and background jobs with minimal configuration. These platforms often include
built-in CI/CD pipelines, logging, monitoring, and environment variable management, making
them ideal for modern DevOps practices.
PaaS solutions also provide strong support for runtime portability and multi-language
environments, enabling teams to build polyglot systems that span multiple services and
technologies. For example, a single application may use Node.js for the frontend, Python for
machine learning components, and PostgreSQL as the backing store — all orchestrated within the

same PaaS environment. This makes PaaS especially useful for microservices and cloud-native
applications. By abstracting infrastructure and streamlining operations, PaaS helps reduce
operational overhead and improves consistency across development, staging, and production

Features and Concepts of Hosted Applications: SaaS
Software as a Service (SaaS) is a cloud computing model that delivers software applications to
users over the internet as fully managed, hosted services. Unlike traditional software that requires
installation, configuration, and maintenance on local systems, SaaS applications are accessed
through a web browser or API and maintained entirely by the provider. This eliminates the need
for customers to manage infrastructure, perform updates, or handle scalability. Well-known SaaS
offerings include tools like Google Workspace, Microsoft 365, GitHub, Salesforce, and Slack.
One of the key features of SaaS is multi-tenancy, where a single application instance serves
multiple users or organizations while isolating their data securely. SaaS platforms also typically
offer automatic updates, applying new features, bug fixes, and security patches seamlessly
without user intervention. Integration with identity providers (via SAML, OAuth, or OpenID
Connect) allows centralized user management and secure access control.

Features and Concepts of Function Applications: FaaS
Function as a Service (FaaS) is a serverless computing model that allows developers to deploy
individual functions: small, self-contained units of code that are executed in response to specific
events. Unlike traditional applications that run continuously, FaaS functions are invoked on
demand, automatically triggered by events such as HTTP requests, file uploads, database changes,
or scheduled timers. The cloud provider handles all aspects of infrastructure management,
including provisioning, scaling, and availability, allowing developers to focus solely on writing
business logic.
A defining feature of FaaS is automatic scaling based on load. When a function is triggered, the
platform creates an isolated runtime environment to execute it. Horizontal scaling is achieved by
running multiple instances as needed to handle concurrent invocations. This model is highly costefficient because billing is typically based on the actual execution time and resource consumption,
rather than pre-allocated compute resources.
Popular FaaS platforms include AWS Lambda, Azure Functions, Google Cloud Functions.
OpenFaaS runs functions in Kubernetes environments. These platforms support multiple
programming languages and integrate with a wide range of event sources.

Function applications are ideal for event-driven workloads, such as processing webhook calls,
handling asynchronous background jobs, performing data transformations, or automating
operational tasks. They are often used alongside APIs, queues, and cloud storage services to build
modular, loosely coupled systems. However, since FaaS functions are stateless and have short
execution lifespans, state management typically relies on external services like databases or
object stores.

Features and Concepts of Content Delivery Networks
(CDNs)
A content delivery network (CDN) is a distributed system of servers strategically placed across
multiple geographic locations to deliver web content, media, and other digital assets to users with
improved speed, reliability, and efficiency. Instead of serving content directly from a central
origin server, a CDN caches static and dynamic assets — such as images, videos, CSS, JavaScript,
and even entire HTML pages — closer to the end user. This significantly reduces latency,
minimizes bandwidth usage on the origin server, and improves the user experience by reducing
load times.
One of the key features of a CDN is geographic distribution, which enables content to be delivered
from the edge server that is physically nearest to the client. This reduces the number of network
hops required and helps mitigate the impact of congestion or regional outages. CDNs also provide
intelligent caching, which automatically refreshes content when updates are detected or based on
specified cache control headers. Many CDN providers include features such as TLS termination,
DDoS protection, origin failover, and real-time traffic analytics, making them not only
performance-enhancing tools but also critical components of a secure and resilient web
Popular CDN services include Cloudflare, Amazon CloudFront, Akamai, and Fastly. These
platforms integrate seamlessly with modern web and cloud architectures, including static site
generators, container-based deployments, and serverless applications.

## 1. What is the primary structural unit in object storage, and how does it differ from traditional
file or block storage?
