---
id: lpi-050-100-04
title: "LPIC-5 · 050-100 — Name some ways that service providers can earn revenue without…",
slug: lpi-050-100-04-lpic-5-050-100-name-some-ways-that-service-providers-can-ear
source: "LPI Learning Material — LPIC-5 (Exam 050-100)",
sourceSection: "1. Name some ways that service providers can earn revenue without charging the users of the, 2. What are some reasons that a service provider might offer its software for self-hosting by, 2. What is an End User License Agreement (EULA)?, 1. Name some ways that service providers can earn revenue with"
track: linux-engineer,
tier: free
tags: [linux, lpic-5, certification, security, cryptography]
summary: "This lesson discusses service provider business models that rely on open source software, and Covers 25 sections: Name some ways that service providers can earn revenue without charging the users of the, What are some reasons that a s.",
---
# LPIC-5 · 050-100 — Name some ways that service providers can earn revenue without…

## 2. What are some reasons that a service provider might offer its software for self-hosting by
customers?

3. Why would a service provider release its software under the GNU Affero GPL license?

1. What is an Acceptable Use Policy (AUP)?

## 2. What is an End User License Agreement (EULA)?

This lesson discusses service provider business models that rely on open source software, and
various revenue streams, including subscription, ad revenue, hourly rate, and commission-based
models. It highlights the impact of open source software licenses on service providers,
emphasizing their benefits and obligations. The considerations of security, privacy, and reliability
of services, along with the importance of Terms of Service (ToS), the Service Level Agreements
(SLA), and the Data Processing Agreement (DPA) are also addressed.

## 1. Name some ways that service providers can earn revenue without charging the users of the
service.
The service can offer ads, for which the advertisers pay. The service can charge a commission
to vendors who offer products or services on the site, such as retail or travel. The service
provider can sell customer data, a practice that many customers would object to and that
should be explained in the Terms of Service.
2. What are some reasons that a service provider might offer its software for self-hosting by
customers?
Potential customers can try out the software to check its features and reliability before signing
up with the service provider. Customers might also find bugs and even propose fixes.
3. Why would a service provider release its software under the GNU Affero GPL license?
The Affero GPL requires other service providers to release any changes they make to the
software under the same license. This provision prevents competitors from taking advantage of
the service provider by adding a few enhancements that they keep proprietary and then
promoting their version of the service as superior to the original.

## 1. What is an Acceptable Use Policy (AUP)?
An Acceptable Use Policy (AUP) is a policy that defines acceptable and unacceptable uses of the
service, to prevent abuse and ensure a secure and reliable environment. Some common
elements of an AUP include a description of specific actions that are not allowed, such as
spamming or hacking, obligations of users to use the service responsibly, actions the service
provider may take in case of violations, such as suspending a user’s account, and procedures
for reporting and addressing violations.
2. What is an End User License Agreement (EULA)?
An End User License Agreement (EULA) is a legal contract between a proprietary software
provider and an end-user (not a company or organization), granting the user the right to use
the software under certain conditions. Some common elements of EULAs include the scope and
limitations of the license (for example, personal use or non-transferable license), prohibited
actions (for example, reverse engineering or redistribution), conditions under which the
license can be terminated, and ownership and protection of intellectual property rights. Fully
open source services substitute an open source software license in place of a proprietary EULA.

### 054.3 Compliance and Risk Mitigation
Open Source Essentials version 1.0, Exam 050, Objective 054.3
- Understanding how to ensure license compliance
- Understanding how to maintain information about licenses
- Understanding the concept of Open Source Program Offices
- Understanding the implications of copyright, patents and trademarks on open source
business models
- Awareness of legal risks related to open source business models
- Awareness of financial risks related to open source business models
- Software Composition Analysis (SCA)
- Software Bill Of Materials (SBOM)
- Software Package Data Exchange (SPDX)
- OWASP CycloneDX
- Open Source Program Offices (OSPO)
- Product warranty
- Product liability
- Export regulations

- Impact of mergers and acquisitions

## 054. Open Source Business Models

### 054.3 Compliance and Risk Mitigation

An old quip in open source says that “Free software doesn’t come for free.” While free and open
source software permit great innovation and creativity, users and developers have to comply with
a number of rules. This lesson covers compliance and risk in open source software.
The lesson lists basic steps that developers need to comply with licenses, the risks of using open
source software, and ways of tracking and cataloguing the software the organization is using.
We’ll look at how these tasks can be turned into policies and promoted by an Open Source
Program Office (OSPO).

Requirements for Releasing Software Based on Open Source
Components
If the organization uses software internally, free and open source software licenses impose no
requirements. The organization might define its own rules to prevent vulnerabilities, make sure
everyone is using the same components, or for other reasons. But that’s beyond the scope of this
lesson. Any requirements that the open source licenses or the organization itself impose on the

use of software should be documented, and the organization should provide training in its
policies.
Even if the organization runs software on its web server and offers services with which people
outside the organization interact, most free and open source software licenses impose no
requirements. However, the GNU Affero Public License requires adherence to copyleft
requirements for software running as a service too.
The legal requirements of each major free and open source software license have been fully
explored in other lessons, so this section just offers a list of actions that developers and managers
should take to comply:
Vetting open source components
The organization needs clear policies and education around what open source software to use
and where to include it in products. Such policies cover compliance, as well as other issues
such as ensuring security and participating in the community that develops the software.
Keep the original license in the code
Developers must not strip the license from the component they use. Including the license in the
source code is usually a requirement in the license. In fact, removing the license could be
considered plagiarism, because the developer makes it look as if they wrote the code. Removing
the license could also lead to serious trouble later, because the organization could violate the
license when the code is included in its products.
Keep track of licenses
The organization must maintain a catalog showing the license of each file or package used by
the organization, in order to make sure it is complying with the licenses.
Acknowledge the author
Nearly all licenses require that credit be given to the copyright owner (often called the
“author”) when discussing and promoting the software. Each license explains what to include
in this notice: Typically, they require a standard copyright notice with the year and the name of
the copyright owner. This notice should appear in any documentation related to the product
using the component, including the advertising and web site for the device or program.
Don’t imply endorsement
Some BSD licenses require the person distributing a product with the components to make sure
not to imply that the copyright owner endorses the product. Even if the requirement is not
stated, complying with it is the ethical thing to do.

Offer the source code for copyleft licenses
If an organization distributes a binary file containing copylefted components, whether as a
software distribution or on a device, the organization has to offer the public the source code to
those components. If the organization changes the code and redistributes the derivative work
in binary form, the source code for the changed (derived) version must be offered to the public
as well. Distribution can be done through any means that make access convenient to the public,
such as posting the code on a web site or offering it on a disk or USB stick.
Don’t include copylefted components in proprietary products
If the organization incorporates copylefted components into a product, under some
circumstances the organization has to release the whole product under the same copyleft
license. The conditions that trigger this requirement vary from license to license. It’s sometimes
unclear, though, what kind of use triggers the copyleft requirement. So, except for clear
situations such as using an open source library (which should not trigger the copyleft’s
reciprocal requirement), developers should be very careful about their use of copylefted
components unless the organization is prepared to release its product under the same license.
Document code changes
When distributing modified versions of code, clearly indicate the changes that the organization
made.
Grant patent rights
Some free or open source software licenses require a grant for patent use on the software.
Thus, if an organization releases code under such a license, and holds a patent on some process
in the code, the organization can’t charge a fee or exert other controls based on its patent to
anyone using or adapting the code.
Respect trademarks
Some open source software is covered by trademarks. Trademarks can cover words and
phrases, logos and other images, and many other things. On the one hand, an organization
must handle the trademark properly for any software it uses: A common violation is to parody,
alter, or simply display a trademark without permission. On the other hand, if the organization
wants to use the trademark, it must comply with the trademark owner’s requirements, which
might rule out modifications to the software.

Risks of Open Source Software
This lesson is about compliance, so we’ll focus on risks in that area, but cover a few other topics
too.

License Violation
Free and open source software licenses have to be treated as seriously as other licenses and
contracts. Organizations do enforce them, such as the Software Freedom Conservancy, which acts
on behalf of small copylefted projects that don’t have their own enforcement mechanisms.
These organizations usually approach lawsuits as a last resort. Most violations are unintended,
and are easy to resolve with education. Still, it hurts an organization’s reputation to be seen as
ignorant and insensitive toward the communities on whose software it depends.
And lawsuits have actually been launched when a software user is flagrantly refusing to
cooperate, and when the software and the defendant are important enough.
Even if an organization is not punished with a lawsuit, the damage that a license violation does to
its relationship with the community, as well as to its reputation, can be substantial. A project can
be derailed by something as simple as having developers' questions go unanswered on the forums
devoted to the software they’re trying to use.
It can be a disaster for someone to find copylefted software in a proprietary product. To comply
with the license, the developers must either strip out all the copylefted code or free their product
under the copyleft license. Making their software free, with source code available, could have dire
effects on business models based on license fees or other ways of monopolizing the value of the
product.

Trust and Reputation
We’ve seen that license violations can be very damaging. Other types of behavior that disrupt
trust and reputation also introduce risks.
Some organizations release software under a free or open source software license, and then
announce at some point that future versions will be under a proprietary license. This switch can
be tempting, because many open source projects fail to receive financial support from enough
clients.
But such license changes induce anger among both clients and the external developers
contributing to the project. Sometimes, external developers take the free version and continue to
develop it independently, a step known as forking the project. The free version might become
competitive with the company’s proprietary version and draw customers away from the
company.
There are also risks when participating in project forums. A company must learn how to be a good
citizen. Common problems include:

- Trying to use a company’s financial or code contributions as leverage to force the project in a
direction that other developers don’t want
- Making too many demands on the community, such as by pressuring it with a lot of feature
requests or even too many questions
- Being rude in other ways and violating the project’s code of conduct
- Trying to dominate publicity or capitalize inappropriately in other ways on the project’s
success

Unrewarded Investments
Business models are discussed in another lesson; this section just notes the financial risk of
participating in open source projects.
Companies might start or join open source projects with the expectation of deriving revenue
through some mechanism such as support contracts, SaaS contracts, data collection, or even
donations and grants. Unfortunately, those who conduct open source projects often find them less
lucrative than hoped for. Of course, any business takes a risk when starting a new project, but it’s
particularly hard to find a reliable source of income for open source.
Open source seems most sustainable when it supports some other form of income, such as the sale
of hardware devices, cars, printers, etc.

Forks
As we’ve seen, members of a project sometimes disagree on the project’s roadmap, leadership, or
other aspects and create an alternative project on the same code base. Forking can also be done by
an organization to create a specialized version of the software. For instance, Android uses a
specialized version of Linux that Google maintains. (Google also makes a lot of contributions to
the core version of Linux, and they are not always accepted.)
Organizations may create a fork for various reasons. They might submit their changes to the core
project and have them rejected, because other developers don’t want them. In a project with a
permissive license, or a project used only within the organization, it might want to keep its
changes secret.
The risk of a fork is that the developers of the forked project are responsible for the maintenance
of the entire product. If important bug fixes or new features are added to the core project, the
developers of the forked project must duplicate the changes or forego their benefits. As time
passes and the projects get further apart, keeping apace with changes in the core project becomes
harder and harder.

Incompatible Licenses
As explained in other lessons, some free and open source software licenses have incompatible
clauses. Such components can’t be used together in a product.
This problem is likely to arise during a merger or acquisition. Each company might have been
using software with a particular license, and if they want to combine the code in their projects,
they must make sure the licenses are compatible.

Product Liability
Many open source software licenses (and the terms of service for many proprietary software and
services, for that matter) explicitly disavow any liability for the software’s use. Another way to say
this is that the license or terms of service offer no warranty or guarantee.
Software vendors are rarely held responsible for problems with their software, but clients
occasionally sue them or try other forms of punishment. Courts don’t have to recognize the “no
warranty” clauses.
Increasingly, laws and regulations are imposing responsibilities on the creators of software. These
legal restrictions — or at least, proposals for restrictions — are seen particularly now for artificial
intelligence, but sometimes are broader.

Export Regulations
Many countries restrict the export of goods and software. In software, such regulations apply
most often to security products, and specifically to the use of cryptography. The United States used
to have strict controls on any software containing cryptography, but the controls have been
relaxed on open source projects.
Companies should be aware of the export regulations where they are creating software, in case
these regulations affect the sale and distribution of their products.

Software Bill of Materials: Know What You’re Using
Many products come with a bill of materials, which is just a list of all their components. For
instance, when you buy a consumer product, it might include a sheet of paper listing all the parts,
down to the nuts and bolts. The list might include useful information such as the dimensions of a
part, and a part number so you can order a new part.
Open source projects are now including a Software Bill of Materials (SBOM, pronounced “Sbomb”). At the very least, an SBOM lists packages, filenames, licenses, authors or owners, and

version numbers. Many SBOMs go further and include information about security vulnerabilities.
Projects generate an SBOM for each release using automated tools. Users can scan the SBOM to
find information they need. For instance, extracting licenses helps the organization decide quickly
whether the components are compatible with their own code and whether it’s legally permitted to
use the components with their code.
Similarly, extracting version information on each package helps the organization discover
whether different parts of its product depend on different versions of a particular library. Using
two versions of the library causes bloat at the very least. It also could create confusion and errors,
if a component is built with the wrong version.

Standards for SBOMs
Because computing environments use enormous quantities (sometimes tens of thousands) of
components and make frequent changes, SBOMs must be highly structured so that information
can be extracted automatically and quickly. This section describes two of the most popular
formats in the open source world:
Software Package Data Exchange (SPDX)
The format represents each package and all the contents of that package in a tree structure.
The format documents dependencies between files, and other relationships. Pointers to
information, known as “snippets,” can be created and then used throughout the document so
that information needs to be defined in only one place. This format was developed by the Linux
Foundation.
CycloneDX
This is a larger format with more detailed fields, particularly for vulnerability information. The
format was created by the Open Worldwide Application Security Project (OWASP) and is
popular in the military and other organizations with a focus on security. For instance, an entry
for a file could include a name for a security vulnerability, the source of information about the
vulnerability, affected targets, and more. This format is also designed for cloud deployments
that can include thousands of different systems.
Both SPDX and CycloneDX create hierarchical structures in various formats, including JSON and
XML. Many tools exist for each standard, both to create the formats and to scan created files for
information. Popular version control repository sites let developers create an SBOM in one of
these formats with the click of a button.

Software Composition Analysis
Knowing what an organization is using requires an assessment of its software that includes an
understanding of where it comes from, what vulnerabilities it contains, what licenses it uses, and
other factors that help an individual or organization decide whether to use the software. This task
is called Software Composition Analysis (SCA), and many tools exist to perform sophisticated scans
of SBOMs and of software itself.
Some tools extract license information, which helps an organization decide whether the software
is safe to include in a product and whether different components have compatible licenses. Some
tools even compare code snippets to libraries of common open source projects to find out whether
code was taken from the open source projects without proper attribution.
Running these tools is especially crucial during a merger or acquisition. The acquiring company
might find that the software it wants to acquire is less valuable than they had expected, because it
contains open source components that impose requirements interfering with its intended use in
the new organization.

Formal Policies and Compliance
The processes and techniques described in this lesson should be fashioned by managers with
input from developers, attorneys, and other knowledgeable people. This section describes some of
the policy decisions that organizations need to make concerning open source software. We’ll end
with a description of an Open Source Program Office (OSPO), which can be an advocate and
information source for the policies.

Principles Governing the Use and Contribution of Open Source Software
Organizations can benefit greatly from using and contributing to open source software, but they
need to do so in ways that protect their own interests as well as benefit the open source projects.
Policies should be defined for:
- Where to use open source software (operations, internal projects, client-facing products, etc.)
- What makes an open source project appropriate for the organization: features, performance,
security, roadmap for future extensions, and community viability
- Scans for software composition analysis, and where resulting documentation should be stored
- Rewards for developers contributing to open source software, including their participation in
public forums
- Guidelines for contributing to projects, including how to be a public representative of the

company
- Documentation requirements, so that developers outside the core team can understand how to
contribute and interact
The OSPO can coordinate the creation of these policies and education to ensure compliance.

Contributor Agreements
Open source projects need to ensure that contributions are legitimate: for instance, that the code
has not been taken from some proprietary product or an open source project with an
incompatible license. Many open source projects require developers to provide a document called
a Contributor License Agreement (CLA) to ensure the legitimacy of their contribution.
Developers at an organization who contribute to these projects might ask the organization’s
lawyers to review and approve the CLA. Thus, the lawyers should understand the relevance of the
clauses of CLAs and be prepared to vet them.
Numerous criticisms have been aired about CLAs, including their complexity and the loopholes
they leave for projects to use contributed code in ways not desired by the contributors.
Many projects, instead of a CLA, ask a developer to sign a short document called a Developer
Certificate of Origin (DCO), attesting that the developer has a right to contribute the code. The DCO,
which is discussed in another lesson, generally is not submitted to a lawyer for review.
Some projects simply ask contributors to sign the copyright to their code over to the project in a
Copyright Assignment Agreement (CAA). However, many contributors dislike this practice, because
they can’t use the code in some proprietary project of their own and because it grants a lot of
power to the project.

The Open Source Program Office (OSPO)
Open source projects combine unusual social, technical, legal, and organizational factors. At this
time, knowledge of these factors has not swept through organizations to the point where all
managers, developers, attorneys, and others understand them deeply. So organizations can
benefit greatly from creating an Open Source Program Office (OSPO) as a central point for
advocacy, policy-making, policy enforcement, and education.
As a kind of all-purpose department, OSPOs can perform many roles, such as:
Promoting open source
OSPOs can disseminate both the concepts behind the open source movement and suggestions

for using open source throughout their organization. They can remind developers to look for
open source solutions to the problems they’re solving and encourage them to adopt
appropriate software. They can urge managers to grant time to developers to participate in
open source projects, and to recognize that participation when evaluating developers for salary
raises and job promotions.
Policy definition
OSPOs can mobilize managers to create policies and set up repositories for them.
Policy enforcement
OSPOs can remind developers to scan software and SBOMs and to follow corporate rules about
the use of open source. The OSPOs can preserve documentation about the software adopted,
and other aspects of corporate use.
Education
OSPOs can explain to developers how to evaluate and participate in open source projects,
explain to lawyers the details of licenses and other legal considerations, and help the company
understand the organizational and cultural changes that facilitate the use of open source
software.
There are numerous documents and online resources for creating an OSPO. A small organization
can farm out the task to a third party who is expert in that area.

## 1. Why shouldn’t a developer just take code they like from an open source project and put it into
their own code without preserving the license?

2. What sorts of documents would a developer sign when making a contribution to an open

## 3. You find some open source software that would make an excellent basis for your retail site. Can
you overlay your logo over its popular logo to make an eye-catching image for your web site?

## 1. What considerations might lead you to make a fork of an open source project for your own use,
despite the drawbacks of forks?

## 2. When you find some open source software that meets your need, what are some reasons you
might reject it?

## 3. You’d like to use a copylefted logging tool in your proprietary product. Is there a way to
combine them that doesn’t require you to offer your product under the copyleft license?

This lesson has covered many considerations to take into account before using free and open
source software. It explained how to adhere to licenses, various legal, reputational, and financial
risks, and how to define important policies and enforce them within your organization.

## 1. Why shouldn’t a developer just take code they like from an open source project and put it into
their own code without preserving the license?
This is usually a violation of the open source license, and also represents plagiarism and
copyright infringement. Practically speaking, the organization can be forced to comply with the
license, with consequences ranging from embarrassment and reputational damage to the
destruction of their business model if copylefted code is mixed in with proprietary code.
2. What sorts of documents would a developer sign when making a contribution to an open
A Contributor License Agreement is a legal document granting rights to the open source
organization to use the code. A Developer Certificate of Origin is a shorter and simpler
document promising that the developer has a right to contribute the code. A Copyright
Assignment Agreement grants all rights to the receiving organization.
3. You find some software that would make an excellent basis for your retail site. Can you overlay
your logo over its popular logo to make an eye-catching image for your web site?
If the project has trademarked its logo, your change would probably violate the trademark.
Even if the logo is not trademarked, your change could be seen as disrespectful as well as
confusing.

## 1. What considerations might lead you to make a fork of an open source project for your own use,
despite the drawbacks of forks?
If you are satisfied with the current state of the code, you might not need to keep up with
changes to the core project. You might want to create a product substantially different from the
uses to which the core project is put, and therefore be willing to part ways with the core
project. The code might be valuable enough in your business plan that your team is willing to
take on complete responsibility for its development and maintenance.
2. When you find some open source software that meets your need, what are some reasons you
might reject it?
The code might contain too many bugs and security vulnerabilities, the project’s developer
community might not function well, you might not like the direction in which the code is
evolving, or the license might not be compatible with other code in your product.
3. You’d like to use a copylefted logging tool in your proprietary product. Is there a way to
combine them that doesn’t require you to offer your product under the copyleft license?
Integrating the code for the tool into your code might trigger the copyleft’s reciprocal
requirement, depending on which license is in effect. The logging tool must be separated from
your product so that your product is not seen as derivative. For instance, it might be safe to run
the copylefted tool as a separate process and communicate with it through message passing.

Open Source Essentials (Version 1.0) |

## Topic 055: Project Management

### 055.1 Software Development Models
Open Source Essentials version 1.0, Exam 050, Objective 055.1
- Understanding the relevance and goals of project management in software development
- Basic understanding of waterfall software development
- Basic understanding of agile software development, including Scrum and Kanban
- Understanding the concept of DevOps
- Phases in waterfall projects (requirement engineering, business analysis, software design,
development, testing, operations)
- Roles in waterfall projects (project managers, business analysts, software architects,
developers, testers)
- Organization of Scrum projects (sprints and sprint planning, product and sprint backlog,
daily scrums, sprint review and sprint retrospective)
- Roles in Scrum projects (product owners, developers, scrum masters)
- Organization of Kanban projects (Kanban boards)

## 055. Project Management

### 055.1 Software Development Models

Life is full of projects. A project might be planning a movie night, a trip, or a family event,
scheduling the children’s week, or improving your work on a hobby. It does not matter what you
want to carry out: You need to make plans and take actions. We usually create several scenarios,
with plan B, plan C, etc. This is no different in the world of software development.

Roles in Software Development
A variety of skills are needed for successful project management, so it’s useful to find different
people to fill well-defined roles. The following sections lay out some of the roles commonly found
on software projects.

Project Manager
Managing a project is a highly complex task. Some situations look easy at first — but it takes care
and experience to get them right. The person doing this is the project manager.
Project manager responsibilities include ensuring that the project is finished on time, within

budget, and with acceptable quality. Even if they don’t write a single line of code, project
managers are the ones who are responsible and accountable for the team’s results. They have to
align with clients about deadlines. They also talk to the people in other roles to make sure
everything is in order.

Business Analyst and Requirement Engineer
There is no place for micromanagement — at least not in a healthy workplace. Business analysts
(BA) and requirement engineers (RE), internal or external to the project team, are the right hands
of the project managers. They are responsible for creating rich and clear documentation about the
requirements. They are also the bridge between the clients and the developers. The clients
communicate through plain language, which the BA/RE ensures will provide clear and
unequivocal documentation with which developers can effectively do their work.
Imagine you are being asked to bring a “big cake” to a party. What does “big” mean? Ten slices or
twenty? Maybe it’s the cake for a big wedding and it should be one hundred slices. The BA/RE has
to specify requirements such as quantities exactly, so that the developers will know, say, that an
application is designed for a specific number of users.
We are just at the beginning of defining requirements, but you already can see the importance of
clear communication. Communication is essential for any joint work, but is perhaps even more
important on an open source project, as people with very different backgrounds might work on
each part of the project. Someone may collaborate as a student, someone else as a parent, a person
who is retired or between jobs, etc. Even so, progress has to be smooth in this environment — so
communication can’t hold up progress.

Developers, Architects, and Testers
To implement the requirements, a software project needs developers who are creating the product
based on the documentations and design decisions. Their work is judged by the architect, who
usually has the most extensive technical and domain knowledge of anyone on the project. Every
developer, especially the senior ones, is responsible for their own code, but big decisions are made
or approved by the architect.
Sometimes people are specifically designated as testers, who are responsible for all kinds of
testing, documenting the results, and creating issue tickets.

Planning and Scheduling
Now that we have discussed basic roles, let’s talk about the phases of a project: planning,
scheduling, implementing, maintaining/testing, and delivering. Some phases differ in various

software development models, but planning and scheduling are general topics we’ll discuss before
diving deeper into different models.
Planning takes place after the BAs/REs provide the list of requirements. Planning consists of one or
more meetings about what the team wants to achieve, how they plan to accomplish it, and how
long it would take. Usually, some risk analysis takes place at these meetings as well.
Planners then have to schedule the work and create milestones. At each milestone, the team knows
that one big, important part is done. Long-term components or features can take months, so
planners have to factor in vacations, holidays, and — especially during cold seasons — some sick
time off, to ensure an accurate delivery time and to avoid rush and panic approaching the
deadline. Under a good schedule, the developers feel more relaxed and can deliver high-quality
solutions in time, without breakdowns.

Common Tools
Two tools that benefit all models, and project management in general, are a version control system
(VCS) and an application lifecycle management (ALM) platform. Version control is discussed in
depth in another lesson, so let’s say a few words about ALMs.
ALM is a comprehensive framework that manages the lifecycle of a software application from
initial development through maintenance and eventual retirement. ALM integrates people,
processes, and tools to enhance collaboration and efficiency, ensuring that all stages of the
software lifecycle are well-coordinated and aligned with business goals. This approach helps to
maintain the quality, performance, and reliability of applications throughout their lifespan.
Now that we have a general overview of roles and lifecycle phases, let’s dive into models.

Waterfall Model
This is one of the earliest and most straightforward methodologies in software development. You
can imagine it as a staircase, where each step needs to be finished before moving forward. But the
model goes in only one direction, making it suitable for projects with clear requirements and
minimal or no expected changes.
Although the simplicity of this model can be an advantage, the rigid menthodology can be a
drawback when flexibility and adaptibility are necessary. And these days, usually, everything
changes while you’re working on your project.
As previous sections explained, to start development, a project needs to have the requirements, a
finished plan, and a finalized schedule for the work with milestones. In the waterfall model, these

are the outcome of requirement engineering and business analysis.

Requirement Engineering
In this initial phase, all the project requirements are gathered and documented. This work
involves extensive discussions between the project manager and stakeholders to understand their
needs and expectations. The outcome is a comprehensive requirements specification document
that outlines what the system should do.

Business Analysis
Business analysts examine the requirements from a business perspective to ensure they align
with organizational goals. BAs perform feasibility studies, risk assessments, and cost-benefit
analyses to determine whether the project is viable and worthwhile. The insights gained are used
to refine the project scope and objectives.

Software Design
Software design is the step where the architect creates a detailed design specification for the
developers to follow. Given this specification, the team can start to implement the
requirements — in other words, start the developement phase, which comes next.

Development
The development phase is where the magic happens — where the code is written. Following the
documentation and the design decisions assiduously, the developers write their parts. After
developers review their code with other developers or the architect, this phase can be considered
done.

Testing
Development is followed by a phase of testing, managed by the testers. There are different types of
testing, described in another lesson, such as unit testing, integration testing, system testing, and
acceptance testing.
The goal of these tests is to bring issues to the surface before release, and to allow the developers
to fix them in time — not after the project is deployed and published and users can be irritated
and frustrated by bugs.

Operations
After the tests are passed and bugs are fixed, the project can be released — that is, deployed to the
production environment. This phase can contain installation, configuration, and sometimes even
user training. After the project is ready to use, it is in a maintenance phase, where the team can
handle issues from the users and deliver updates if necessary.

Evaluating the Waterfall Model
What have you noticed while reading about this model? Do you find it efficient? Is something
missing? Let’s see the pros and cons.
The waterfall model benefits from:
Clear structure
The linear process makes it easy to manage, understand, and follow.
Meticulous documentation
Detailed and thorough documentation at each phase helps the team understand what’s needed
during development and future maintenance.
Predictability
Clear, defined milestones help to provide a foreseeable timeline and budget.
Simplier project management
Thanks to its linear and straightforward flow, the model is easy to manage.
The waterfall model suffers from:
Rigidity
The linear inflexibility of the model makes it difficult to implement any changes after the
requirements phase is finished.
Late testing
During the development phase, testing is haphazard or missing, which can lead to late
recognition of important issues.
Assumption of perfect requirements
The model requires and assumes that every requirement is correct and clear, which can be
very unrealistic. The model does not make room for checking during development to make
sure the requirements are accurate and are understood by developers.

Lack of feedback
Only in the last phase can a customer say anything about the product. So if something (or a lot
of things) do not meet their expectations, the problem turns up only at the very end.

Agile Software Development, Scrum, and Kanban
To explore this set of more modern software development models, let’s start with the word agile:
What does it mean? Agility expresses the ability to react and move quickly, in both the physical
and mental world. The goal is the same in software development.
Agile software development is a methodology that builds on iterative development, flexibility, and
collaboration. It focuses on delivering small improvements while always gathering feedback and
implementing it during development. This approach allows quick reactions, adjustments, and
responses, saving time and ensuring that the project meets users' and clients' expectations.
The agile movement was launched in 2001 by an online Manifesto for Agile Software Development
that listed its principles as follows:
We are uncovering better ways of developing software by doing it and helping others do it.
Through this work we have come to value:
- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan
That is, while there is value in the items on the right, we value the items on the left more.
— Manifesto for Agile Software Development

Scrum
Scrum is one of most popular frameworks — maybe the most popular — within agile software
development. Scrum is built upon the following building blocks:
In a nutshell, Scrum requires a Scrum Master to foster an environment where:
1. A Product Owner orders the work for a complex problem into a Product Backlog.
2. The Scrum Team turns a selection of the work into an Increment of value during a Sprint.

3. The Scrum Team and its stakeholders inspect the results and adjust for the next Sprint.
4. Repeat
— The 2020 Scrum Guide

But who is the scrum master and product owner? What is a product backlog and a sprint? Let’s
dive into the roles and processes.
Sprints and Sprint Planning
A sprint is a development phase typically lasting two to four weeks, during which some previously
agreed tasks and/or features are completed. To get agreement on tasks, sprint planning comes in.
This process is where the team makes decisions about which tasks can be completed during the
upcoming sprint.
These choices are based on the priorities set by the product owner (PO), who controls the project
and often provides the funding for it.
Product Backlog and Sprint Backlog
As just explained, the PO manages the list of priorities, which contains all the desired work on the
project. In Scrum, this list is called the product backlog. Each sprint backlog contains the selected
tasks for the current sprint from the product backlog. The sprint backlog contains the elements
that were chosen by the team during sprint planning.
Daily Scrum or Stand-up
The daily Scrum or stand-up meetings are short, efficient meetings where the teams discuss their
progress, highlight issues and blockers, and share their plans for the day. A scrum is usually held
at the very beginning of the workday.
Increment
An increment is a goal achieved during a sprint. Each sprint should result in one or more
increments. The correctness of the task or features achieved by the increment should be verified
by testing.
Sprint Review
The sprint review is a meeting to inspect the sprint’s outcome. These meetings are usually more
than demos — the goal is to get feedback based on the Scrum team’s results. As the aim is to reach
the product goal, the stakeholders give opinions and suggestions about future adaptations. The

outcome of these meetings can be changes or additions to the product backlog.
Sprint Retrospective
The goal of the sprint retrospective is to enhance quality and effectiveness — and not just in the
current product. The retrospective should reveal hidden tensions within the team, any lack of
information that slows down processes, outside dependencies that should be eased to lighten the
burden of the team, etc. The team discusses what went well, what problems they faced, and what
solutions were (or were not) found for those issues.
The outcome is a list of problems paired with possible solutions assigned to the responsible
person.
Scrum Master
All of these meetings are hosted by the Scrum master. Each Scrum team needs one. They are
responsible for facilitating Scrum processes and helping the team keep moving toward the
product goal while issues are encountered during sprints. The Scrum master not only guides
processes, but acts as a coach to ensure effective communication within the team.
Product Owner
The product owner is responsible for maximizing the value of the product created by the Scrum
team. This role may vary across different organizations and teams. Even when delegating tasks,
the product owner remains accountable for the outcomes.
Success requires organizational respect for the product owner’s decisions, which are reflected in
the product backlog and the sprint review’s increment. The product owner is a single person,
representing various stakeholders' needs in the product backlog. Anyone wishing to change the
backlog must persuade the product owner to do so. The product owner defines and prioritizes the
product vision and backlog and ensures the transparency, visibility, and understandability of the
product backlog.
The Scrum master and product owner collaborate to drive project success. Their partnership
helps the development team deliver high-value features efficiently and effectively.
Developers
The developers implement the requirements following the agreed sprint backlog. They can work
independently, but there are several occasions where they might collaborate: for example, pair
programming or reviewing another developer’s code.

Evaluating the Scrum Model
Scrum has become favored among software teams, but it too has pros and cons.
The Scrum Model benefits from:
Flexibility
Processes are flexible and iterative, allowing for changes based on feedback.
Customer involvement
Regular feedback from stakeholders ensures alignment with customer needs.
Improved quality
Frequent testing and reviews improve product quality.
Team collaboration
The model emphasizes teamwork and communication through daily stand-ups and regular
meetings.
The Scrum Model suffers from:
Required discipline
Scrum calls for strict adherence to its practices, which can be challenging.
Scope creep
There is a risk that more and more customer requests will be added and hold up the release, if
the product backlog is not managed well.
Role confusion
Standard roles such as Scrum master and product owner can be misunderstood or poorly
implemented.
Resource intensivity
Daily meetings and frequent reviews can be time-consuming.

Kanban
Kanban is another popular agile framework that emphasizes work visualization, flow
management, and process improvements. One of the big differences between Scrum and Kanban
is that Kanban does not require fixed-length iterations. Thus, it makes continuous delivery more
flexible and can balance different work priorities.

We’ll look at what teams need for a Kanban project in the following subsections.
Kanban Boards
A Kanban board is a visual tool that tracks the work’s flow through stages. The main and most
important columns are “To Do,” “In Progress,” and “Done.” More columns can be added, but these
three main columns have to be on the board. This visualization helps teams to catch bottlenecks
and see the status of tasks in the blink of an eye.
Work in Progress Limit
A work in progress (WIP) limit helps to avoid multitasking and improves focus. With this limit in
place, there is a point where no more tasks can be added to the “In Progress” column. In this way,
the developers will not be overloaded by tasks and they can focus on the tasks on which they are
currently working.
Team Members
Team members are responsible for completing tasks and establishing a smooth flow through the
Kanban system. They collaborate to prioritize work and highlight and address any kind of issues
that emerge.
Kanban Manager
The Kanban manager oversees the Kanban process, ensuring that the team follows Kanban
principles and practices. This manager facilitates meetings, monitors workflows, and helps
resolve any problem that may arise.
Evaluating the Kanban Model
The core of this model is simple. Let’s look at pros and cons.
The Kanban Model benefits from:
Visual workflow
Kanban boards provide clear visibility of work status and progress.
Flexibility
Lacking fixed iterations, the model supports continuous delivery with substantial adaptability.
Limits on tasks
The WIP limit helps prevent team members from getting overloaded and thus improves their

focus and efficiency.
Continuous improvement
The model encourages regular evaluation and process improvements.
The Kanban Model suffers from:
Lack of timeframes
Without set deadlines, time management is challenging.
Less structure
The model might lack the structure some teams need to stay organized.
Required discipline
Effective WIP limits and board management require careful attention.
Potential oversimplification
The task descriptions might oversimplify complex projects if not implemented thoughtfully.

DevOps
DevOps is a software development approach that integrates the development (Dev) and operations
(Ops) teams to enhance collaboration, efficiency, and the speed of delivery. The primary goal of
DevOps is to shorten the software development lifecycle and provide continuous delivery with
high software quality. DevOps emphasizes automation, continuous integration and continuous
delivery (CI/CD), and close collaboration between traditionally siloed teams.
Automation is crucial in DevOps for tasks such as code integration, testing, deployment, and
infrastructure management. Automating repetitive tasks reduces errors, speeds up processes, and
allows teams to focus on more strategic work.
Continuous monitoring and logging are essential to maintain system health and performance.
DevOps practices include setting up comprehensive monitoring and logging systems to detect
issues, analyze trends, and improve system reliability.

Evaluating the DevOps Model
Although DevOps is highly recommended for many types of modern software projects, pros and
cons still have to be considered.
The DevOps Model benefits from:

Speed and efficiency
The model accelerates development and deployment cycles through automation.
Improved collaboration
The model bridges the gap between development and operations teams.
Continuous delivery
The model ensures that software is always in a deployable state, leading to more frequent
releases.
High reliability
Automated testing and monitoring enhance reliability and reduce errors.
The DevOps Model suffers from:
Cultural shift
The model requires a significant cultural change and buy-in across the organization.
Complexity
Managing CI/CD pipelines and automated infrastructure can be complex.
Security risks
Continuous deployment can introduce security vulnerabilities if not managed carefully.
Tool overload
DevOps can be overwhelming due to the multitude of tools and technologies involved.

1. What does agility mean?

2. What is the Scrum definition, according to the Scrum Guide?

3. Why can Scrum perform better than the waterfall model regarding client feedback?

## 4. What are the positive aspects of DevOps?

1. Why is the waterfall model not the best to use in a fast-changing environment?

2. What can happen when the role of the Scrum master is poorly implemented?

The relevance of project management in software development, especially in open source
projects, lies in its ability to provide structure, enhance communication, define roles, manage
risks, and ensure quality. These elements are crucial for the successful completion of projects and
for fostering a collaborative and productive development environment.
In this lesson, we went through the waterfall model, agile methodologies, and DevOps. Knowledge
of these models is essential to understand project management in software development. There is
no golden right way to work — every project is different. In this lesson, you learned the roles,
processes, and pros and cons of various approaches, which can help you in the future to
understand and perhaps choose the right model for a project.

## 1. What does agility mean?
Agility expresses the ability to react and move quickly, in both the physical and mental world.
2. What is the Scrum definition, according to the Scrum Guide?
- A Product Owner orders the work for a complex problem into a Product Backlog.
- The Scrum Team turns a selection of the work into an Increment of value during a Sprint.
- The Scrum Team and its stakeholders inspect the results and adjust for the next Sprint.
- Repeat
3. Why can Scrum perform better than the waterfall model regarding client feedback?
Because feedback is collected during development, the final product can better meet client
expectations.
4. What are the positive aspects of DevOps?
Speed and efficiency — Improved collaboration — Continuous delivery — High reliability

1. Why is the waterfall model not the best to use in a fast-changing environment?
The waterfall model collects feedback only at the end of development. Thus, any requirement
that was misunderstood by the developers has to be corrected at the very end. If the
environment changes very quickly, this model should not be used because there is no provision
for feedback in the middle of the development cycle.
2. What can happen when the role of the Scrum master is poorly implemented?
A poorly implemented Scrum master role can hinder the team’s ability to deliver high-quality
products efficiently and can undermine the benefits of adopting Scrum. The team may lack
proper guidance on Scrum practices and principles, leading to inconsistent or incorrect
application of the framework.
Without an effective Scrum master to remove obstacles, impediments can slow down progress
and reduce team productivity. Miscommunication between team members and stakeholders
can occur, resulting in misunderstandings and misaligned expectations. The team may
experience decreased morale and motivation due to unresolved issues, lack of support, and
ineffective facilitation of Scrum events. Inefficiencies may arise from poorly conducted
meetings, lack of focus, and ineffective sprint planning and reviews.

### 055.2 Product Management / Release Management
Open Source Essentials version 1.0, Exam 050, Objective 055.2
- Understanding common release types
- Understanding software versioning and reasons for major or minor releases
- Understanding the lifecycle of a software product, from its planning, development and
release to its retirement
- Understanding the documentation for product versions
- Alpha and beta versions
- Release candidates
- Feature freeze
- Major and minor releases
- Semantic versioning
- Roadmaps and milestones
- Changelogs
- Long Term Support (LTS)
- End of Life (EOL)
- Backward compatibility

## 055. Project Management

### 055.2 Product Management / Release
Management

Most software evolves in many ways over time. In fact, that’s one of the wonderful things about
software: It’s easy to change and requires just a network transfer to update everyone who’s using
the product. So developers add new features, fix bugs and security flaws, port the software to new
hardware, and add interfaces to popular programs and services. As the software changes, new
versions or revisions are released.
This lesson covers the logistics for planning and making changes to software, how teams juggle
multiple versions, conventions for naming the versions, and other organizational aspects of
development that are a subset of the actvities involved in project management. The logistics that
apply specifically to the timing, naming, and control of releases is known as release management.

Characteristics of Releases
Releases vary in terms of stability, backward compatibility, and support. We’ll examine each of
those concepts in the following sections.

Stable and Unstable Releases
Stability is a key trait users expect from software. The first question many ask, upon hearing of a
new release, is “How stable is it?” In other words, will it work reliably, or will it crash, corrupt
data, or produce incorrect results?
Stability can be measured on a spectrum, and many people are happy to use software even when
there are still some bugs. But development teams tend to keep things simple, and talk in binary
fashion about stable and unstable releases.
Stability refers both to the bugginess of the software and its likelihood to change in ways visible to
outsiders. Developers might consider a release of a software library unstable because they have
changed the functions that programmers call (that is, because programmers might have to rewrite
their software for the next release). Or software might be unstable from a user’s point of view
because developers have removed a feature.
Is there any reason to release an unstable version? Yes: They are valuable for letting users try out
new features early in the project and test for bugs.
Most projects release very early revisions of software for key clients to try out; these are called
alpha releases. No one should use these releases for real work — they are only for testing. In fact,
testers should run alpha releases on computers that aren’t doing any important work, because
bugs in those releases could actually damage data stored on the computer.
When the software is close to being considered stable, the project usually release another test
revision called a beta release. These should still not be used for production work, only for testing.
For both alpha and beta releases, the developers have a process for reporting bugs and tracking
the progress toward fixing bugs.
Some projects include another stage between the beta and stable releases, when developers have
fixed all the bugs they can and think that the product is done. They call the version a release
candidate and show it to key customers or stakeholders so that these stakeholders can plan how to
use new features.
Finally, some projects put in features that are not quite stable, because important users have
requested them. The developers intend for users to try these features and say whether they like
them, before developers finalize the interfaces and invest the effort to stabilize the features.

Backward Compatibility
Most projects seek backward compatibility, meaning that they try not to remove features or

functions that existed in older versions. Compatibility can exist on several levels. For instance, if
the developers maintain backward compatibility for the application programming interface (API),
they promise that old source code can continue to work, but it might have to be recompiled. If
hardware vendors or operating system developers maintain backward compatibility for the
application binary interface (ABI), they promise that in addition, old executable files can run on
new versions of the hardware.
We’ll look later at the ways projects handle a lack of backward compatibility, when they decide
that the old interface really doesn’t work for the new features or environments they need to
support.

Support and End of Life (EOL)
Software would ideally get better and better as developers discover and fix its problems. But over
time, features can stop working because of changes in the software’s environment. Also, new bugs
are discovered that were hidden before.
New versions often combine security and bug fixes with new features. You might not want the
new features (in fact, you might prefer some old feature that the developers removed in order to
make way for new ones), but people usually upgrade to the new version to get the security fixes
that will protect them against malicious attacks.
Some people actually keep using old versions of software, refusing to upgrade. This is normally
because the new version breaks something that was working in their environment. When
companies charge money for upgrades, some customers refuse to upgrade because they don’t
want to pay the extra money, but paying for upgrades is rare in open source.
Developers accommodate the users of old versions, if possible, by fixing bugs in the old versions
without adding the features that break the software. Naturally, the developers can’t do this
forever because it drains time and energy from new work. There will come a time when they
refuse to fix an old version and tell the users either to upgrade or to make their own fixes.
Fixing bugs and security flaws is called support for the software. This is different from the support
offered by helpdesks and other people who guide users in understanding the software. So far as
release management goes, a supported release is one where the developers promise to fix bugs,
whereas an unsupported release is one where they do not.
Note that the notion of “support” applies mostly to software created by companies or large
organizations. Smaller open source projects, depending heavily on volunteers, often promise just
to do the best they can to fix bugs and put out new versions. They don’t see a need to fix old
versions. Because the code is open source, users who don’t want to upgrade can pay someone to
fix an old version.

When support is in place, developers publish a schedule indicating how long they’ll support each
version. The date where support ends is called the software’s end of life (EOL). Users can keep the
old version up to EOL and expect bugs to be fixed, but after EOL they have to upgrade or take
their chances.
Major projects, such as the Debian distribution of GNU/Linux, offer long term support (LTS)
versions. That simply means that the developers will keep fixing bugs for a certain number of
years. Customers who value stability highly might be afraid to install versions of software that
have lots of changes, in case the changes break processes that the customers rely on. Such
customers, notably large institutions, like the security of LTS versions.

Software Versioning: Major, Minor, and Patches
We’ve seen that versioning is complicated: Some versions fix bugs, while others add features, and
the versions can vary in stability. Developers try to indicate through labels how big a change to
the software is in each version. The conventions adopted by nearly all projects for labeling
versions are called semantic versioning.
Let’s take the early history of the Linux kernel as an example. Linus Torvalds labeled the first
stable release 1.0. As he improved the kernel, he labeled subsequent versions 1.1, 1.2, and so forth.
The initial 1 was the major version and the numbers after the period denoted the minor version.
You could assume that version 1.2 had more features and offered more than version 1.1 did.
But there were also innumerable small releases, sometimes just to fix a few bugs. To show that the
changes had a minor impact on the use of the kernel, Torvalds included a third number called the
patch. Thus, 1.0 was upgraded to 1.0.1, then 1.0.2, and so on.
Patch numbers start over at 0 when a new minor version is released, and minor version numbers
start at 0 when a new major version is released.
Developers lump together versions using an “x” to indicate that they’re talking about multiple
versions, such as 1.x for all versions under major version 1.
But what’s the difference between a change that leads to a new minor version and a change that
deserves to trigger a new major version? Usually, years pass before a new major version is
released, and it has to reflect a very significant upgrade.
Generally, developers try to keep backward compatibility as versions change. If backward
compatibility cannot be preserved, developers should increment the major version.
Sometimes you see a version number less than zero, usually 0.9. The leading zero indicates an
early version of the software that is unstable and unready for production use. There is no

guarantee of backward compatibility until the developers release versions starting with 1.
Alpha versions are usually indicated by appending “a” or “alpha” after a release number, such as
3.6alpha. Similarly, beta versions append “b” or “beta” after the release number.

The Software Product Lifecycle
Don’t think the life of a developer is easy. Everybody wants something from them. I want this bug
in screen layout fixed A.S.A.P., whereas someone else says that the bug in filenaming takes
precedent. Users clamor for new features, and when different developers work on different
features in parallel, they find that one’s changes may trample those made by another.
Project management, and the subset of these tasks called release management, deal with these
issues. Usually, a senior project member takes on responsibility for this management job.
Like people, software versions go through a lifecycle. Each one begins with a discussion of new
features and other changes needed, goes through development and test phases, and is rolled out
in a planned manner.

Planning and Roadmaps
Developers try to lay out, far in advance, what changes they want to make to a product. In
commercial firms, they talk to marketing people, who filter and summarize what their customers
tell them. Open source projects depend more on ideas submitted by developers and users, which
are captured in a database called an issue tracker. If you need a bug fixed or want a new feature,
you fill out an issue. Developers then prioritize the changes and decide who will handle each one.
So how are changes chosen and prioritized? It can be a messy process. But good project managers
on open source projects encourage broad input while ensuring that decisions get made. Some
projects even hold conferences where participants hash out the priorities.
A published roadmap lays out the resulting plans for enhancements and changes. It may extend
many releases and many years into the future. Each step is called a milestone, and might or might
not be associated with a target date.

Release Scheduling
There are two basic ways to schedule releases: time-driven and feature-driven. A project can
promise a release at regular intervals — every six months, for instance — and include whatever is
finished at that point. Alternatively, the project can promise to include certain features in a
release, and let the developers take as long as they need to finish those features.

As the time for the release approaches, the release manager determines dates for the alpha, beta,
and stable releases. Team members regularly review bug reports and try to plan their work so
that they meet these milestones.
In order to finish a release, a project has to stop accepting ideas for new features and focus on
making the existing features work right. This moment is called a feature freeze.

Documentation for Product Versions
Roadmaps, as mentioned earlier, explain the features that developers plan to include in each
release. The release is accompanied by a list of changes called a changelog. Generally, the
changelog lists new features, changes to existing features, features that were removed, features
that the developers intend to remove in the future (known as deprecated features), and bug fixes.
Thus, changelogs can get quite long and detailed. Users need to pay special attention to features
that were removed or are deprecated, because the users might have to change their programs or
way of using the product. Obviously, developers try to remove only those features that nobody
needs any more.
Each release should change product documentation to match changes in the product. This task
can be time-consuming, and it’s easy for developers to miss a change or lag at producing
documentation.

1. What distinguishes a stable release from an unstable one?

## 2. Would you expect a feature change between a release named 2.6.14 and a release named
2.6.15?

## 3. Would you expect a feature change between a release named 2.6.0beta and a release named
2.6.0?

4. Why would you expect release 1.0 not to be backwardly compatible with release 0.9?

## 5. If you discover a security flaw in a version after a feature freeze but before its release, can you
get the flaw fixed?

## 1. Suppose you want to keep using a version of open source software after EOL, because it has a
feature you need. What can you do to keep it usable?

2. What are some criteria that allow one bug fix or feature request to be chosen over others?

This lesson described the main characteristics that distinguish releases: stability, backward
compatibility, and support. We discussed the meaning of version names and numbers, and key
aspects of release management, including documentation.

## 1. What distinguishes a stable release from an unstable one?
Releases are considered stable in two ways: They work well without crashing or producing
incorrect results, and the interface presented to users or programmers is expected to be
backward compatible with previous versions.
2. Would you expect a feature change between a release named 2.6.14 and a release named
2.6.15?
No. The third number in semantic versioning indicates a patch, which was made to fix a bug or
carry out some other minor task such as reformatting. A feature change should lead to a minor
or major release.
3. Would you expect a feature change between a release named 2.6.0beta and a release named
2.6.0?
No. The beta version is a test version that contains all the features to be included in the final
release.
4. Why would you expect release 1.0 not to be backwardly compatible with release 0.9?
The number 0.9 explicitly warns potential users that the software is still being designed and
could very likely have a different interface when it is stabilized as version 1.0.
5. If you discover a security flaw in a version after a feature freeze but before its release, can you
get the flaw fixed?
Most certainly. The period between a feature freeze and the release is meant as a time to
discover and fix flaws, including security flaws.

## 1. Suppose you want to keep using a version of open source software after EOL, because it has a
feature you need. What can you do to keep it usable?
After EOL, the project developers have no commitment to fix bugs, including security flaws.
Therefore, you should follow the project’s bug tracker and mailing lists assiduously to find out
what bugs turn up. Because the code is available, you can and should fix bugs that are in your
version. In theory, you could even incorporate new features into your version. That would
effectively make your version a fork of the original.
2. What are some criteria that allow one bug fix or feature request to be chosen over others?
For bug fixes, criteria include severity (which is assigned to the bug after it enters the bug
tracker) and the number of users affected by it. For a feature, criteria include the number of
users who want the feature, the difficulty of coding it, and its potential impact on other parts of
the program.

### 055.3 Community Management
Open Source Essentials version 1.0, Exam 050, Objective 055.3
- Understanding roles in open source projects
- Understanding common tasks in open source projects
- Understanding the various kinds of contributions to open source projects
- Understanding the various kinds of contributors to open source projects
- Understanding the role of organizations in maintaining open source projects
- Understanding the transfer of rights from individuals to an organization maintaining a
project
- Understanding rules and policies in open source projects
- Understanding attribution and transparency on contributions
- Understanding aspects of diversity, equity, inclusivity and non-discrimination
- Software development
- Documentation
- Designs and artwork
- User support
- Developers

- Release managers
- Users
- Project leads and benevolent dictators
- Individuals and corporations
- Enthusiasts and professionals
- Core team members and occasional contributors
- Code and documentation contributions
- Bug reporting
- Forks
- Foundations and sponsors
- Contribution agreements
- Developer Certificates of Origin (DCO)
- Coding guidelines
- Codes of conduct

## 055. Project Management

### 055.3 Community Management

A key reason to create an open source project is to draw contributions from many different
people. Open source makes it easier to respond to the different needs and interests of the project’s
users and to benefit from their varied skills. Therefore, a diverse community is central to the
success of the project. The community is where creative forces come together to make your
project succeed.
This lesson explains the basic elements of free software and open source communities and how
people in them work together. Of course, because communities are made up of different people,
and because projects have different goals and requirements, each community is unique.

Roles in Open Source Projects
The main output from most open source projects is software, so at the very least, such projects
require programmers, software designers or architects, testers, release managers, and other
experts in code development. Documentation is usually a part of such projects too, so the
community also needs authors, editors, and reviewers.

Other projects might not produce code, but other “deliverables” such as a book, an art or music
project, or a policy report. Wikipedia is a well-known example of collaboration on an open source
project that focuses on text documents and media. These projects need experts in the design,
production, and delivery of the deliverable.
Communities also benefit from many other general skills, such as marketing and evangelism,
administration, legal advice, artistic talent to produce logos or diagrams in documentation, and
skills at maintaining the project’s web site and other communication tools. Open source projects
might organize physical get-togethers and even conferences, in which case they need organizers
to bring those events to life.
The proceeding paragraphs give you an idea of the types of skills a community looks for. These
general roles can be further subdivided into various focused tasks. One simple example of such a
task is for some writers to edit the work of other writers.
Among programmers, a range of experience exists. A healthy project always wants some veteran
programmers (or senior programmers) who know its code and coding standards well, along with
newbies who provide new ideas and simple help such as bug fixes. Some newbies will hopefully
evolve into the next generation of veterans.
Code quality requires careful control over what gets into the central repository shared with users.
Therefore, some veterans get committer status. They are responsible for checking contributions
for quality, usefulness, and conformance to coding standards. They have the priviliges to accept
the proposed code into the trusted repository. Other contributors submit code to the committers
for review.
Many committers and other veterans also mentor new contributors to teach them the standards
and practices needed to get their code accepted.
Some committers fail to appreciate the gift that a contributor is offering. If the contribution falls
short of quality or coding standards, the committer might simply reject it. But the rejection
discourages the would-be contributor and eliminates a valuable educational opportunity.
Remember that good committers are also mentors. So they give the contributor hints about how to
bring the code up to standards and work with the contributor over time. If the contribution is
truly unusable, the contributor should at least be thanked and encouraged to work on something
else for the project. It’s important to help people discover and refine their skills.
When a company starts an open source project, it sometimes appoints committers from its own
staff to ensure that it can control the direction and quality of the project. But often, companies
allow non-employees who show skill and dedication to become committers.
Project leads make critical decisions such as what new features to support. These project leads

often have non-coding decisions to make as well, such as how to promote the project, resolve
major disagreements, and get funding. Project leads and committers work closely with release
managers to decide when a code base is stable and ready to share with the users.
Some projects have a single project lead, often referred to as benevolent dictator. This is often a
person who started the project (Linus Torvalds being a well-known example in the case of Linux)
and who has great authority and even charisma. However, most projects prefer to set up a small
committee of project leads instead of a single benevolent dictator. Even the Linux project has
moved to a committee approach.
Projects might also ask particular contributors to provide user support on the project’s forums.
But healthy projects should have many knowledgeable users who support each other.
We’ll finish this section with a very important role: the community manager. This is someone
responsible for maintaining open and constructive communication and making sure the
community progresses toward its goal. The community manager knows how to onboard and
motivate contributors, resolve arguments, protect community members against abuse, and
perform other tasks to maintain the community’s health.

Common Tasks in Open Source Projects
In many ways, open source projects involve the same tasks as traditional projects carried out
within a single organization. For instance, all code requires testing. But in some ways, open source
projects differ from proprietary ones, where only a limited set of people are allowed to change the
code and where the source code is often hidden from the public.
For instance, corporations usually assign trained quality assurance (QA) staff to test code. But
many open source projects just ask their users to test each release. (Proprietary projects involve
their users in testing too, in addition to QA.)
Another example of differences: A proprietary project usually assigns paid developers to specific
tasks and tells them how much of their time each week to spend on the tasks. Some open source
projects benefit from contributors who are paid by their employers, or sometime even employed
by the project itself, and who are assigned tasks in the same way as proprietary developers. But in
most healthy projects, a lot of contributions come from volunteers who just do the tasks as time
permits. Because the project doesn’t rely on all volunteers to complete their projects on schedule,
an open source release might be delayed until the developers feel that the features are ready, or
might be released at fixed times with whatever features are ready.
Communications are critical to both proprietary and open source projects, but are often
conducted differently. Proprietary projects often gather a team in one office and hold regularly

scheduled stand-up meetings under a development methodology such as SCRUM. Because open
source projects are geographically distributed, such methodologies are rare. Instead,
communication takes place online and asynchronously.
In short, free software and open source projects often achieve the same goals as proprietary
projects, but in different ways.
Bug reporting is a critical part of software development that gives rise to its own set of roles.
Someone has to monitor the bug database and assign priorities. If a bug is critical (and
particularly if it can weaken the software’s security), it should be assigned to a competent
maintainer to fix.
Project leads and community managers should look over participation in the project and see
where there are gaps. Are too few people willing to test code? Is documentation missing? Are too
many veterans or senior project members leaving without being replaced? Project leads and
community managers can focus on recruiting people to fill needed roles.
Project leads and community managers on large projects often gather metrics as well, to learn
important things such as whether important bugs are getting fixed in a timely manner.

Kinds of Open Source Contributions
As explained in an earlier section, people who put code, documentation, or other items in the
central repository are called contributors. Project members who approve contributions and accept
them into the repository are called committers. Some members take on other common roles for
software development.
Although the term contributor is usually reserved for someone who develops code or another part
of the project’s official offering, anyone who participates to the project’s success is contributing in
some way and should be thanked for doing so. These more informal contributions include
reporting a bug, answering a question on a forum, donating or raising funds, and promoting the
project to outsiders.
Open source projects, like proprietary ones, ask users what they want in terms of features,
performance improvements, or other changes to the project. These users are making important
contributions by voicing their opinions.

Kinds of Open Source Contributors
Many communities draw contributions not only from individuals, but from corporations who pay
their staff to contribute to a project that the corporation thinks is important to its business.

Sometimes, having paid contributors right next to volunteers can create tensions. Volunteers
might feel that their work is being exploited, or might be afraid that paid contributors are trying
to bend the direction of the project to favor their employers' interests. A community manager and
the project leads must guarantee that all accepted contributions provide benefits to the whole
project and its users. Volunteers must also receive motivation to contribute for their own personal
reasons, whether out of loyalty to the community or to meet their needs.
Some people contribute to a project regularly and take on long-term responsibilites; these are
called core team members. Healthy communities also have occasional contributors who report
bugs or post advice on forums, but are not expected to assume responsibility for the project.
Similarly, some contributors will be professionals in their field — whether or not a company pays
them to work on the project — whereas others are amateurs, often called enthusiasts. But you
don’t have to be a professional to take on an important role. You might even become a core team
member or project lead.

The Role of Organizations in Open Source Projects
Although many open source projects are created by zealous individuals or small groups of
volunteers, they usually seek organizational support when the projects get large. Organizational
support can take many forms. In general, organizations make these contributions because an
open source project can meet their business needs more cheaply and more reliably than
reinventing the same features in proprietary code. The guarantees provided by a free or open
source license are valued by many organizations.
Some idealists distrust corporations or other large organizations and would prefer to keep open
source projects entirely free from their influence. Over the years, this rather simplistic attitude
has become less common. Most open source advocates believe that corporations and other
organizations can provide crucial underpinnings to open source projects.
Many open source projects start within an organization, and might even be based on proprietary
code that the company decides to open up. To make money, the company may decide to keep firm
control over the project and to break it into open and proprietary parts: This is called the open
core model. Many project founders start as open source but form a company around it, which
might or might not use the open core model.
Other projects try to ensure that no single company controls their direction. Maintaining
independence usually requires signing up several organizational supporters, so that no one is
strong enough to make a dictatorial decision.
How do organizations support open source? As mentioned earlier, many put paid staff onto

projects. Additionally, they might hire highly productive individuals who have contributed to the
project as volunteers and have developed expertise in the project. This path to employment is a
valuable way for students and other volunteer contributors to advance their careers.
Companies desiring extensions that don’t interest other users should not pressure the open source
project to add the extra features, but should pay their staff to write the features without
contributing them back to the project.
An interesting example of the possible tension created by corporate needs is shown by the famous
Android operating system, based on Linux and developed by Google to drive its mobile devices.
Some changes to Linux made by Google are contributed back to the Linux community, whereas
other changes appear only in Android. The Linux developers sometimes reject changes submitted
to them by Google, just as all projects choose what contributions to incorporate.
There are many reasons for a company, or a group of developers, to make a separate version of
your code. Ideally, they can meet their needs by adding an optional library or sequence of code
that can be excluded during compilation. But sometimes a group feels a major need that is
incompatible with the direction chosen by project leaders. When a separate version is made, it’s
called a fork.
Forks used to be considered failures of collaboration, but nowadays forks are much more
accepted. Usually, people who make a fork set up a new repository and start a new project. Some
people work both on the original project and the fork.
(Note that GitHub uses the word “fork” for a very different phenomenon: making a clone or copy
of project code to work in separately.)
In addition to code, many companies contribute financially. They may fund efforts such as
marketing and conferences. They can join the board and offer expert advice on the project’s
direction and strategy.
An example of the importance of such “soft support” comes from the historic Apache web server.
The project took a big leap forward early in its existence when IBM showed interest. IBM lawyers
showed the project how to create legal safeguards, and a meeting paid for by IBM helped the
Apache leadership create a robust organization.
To maintain independence, many open source projects form a nonprofit foundation or join an
existing foundation. Famous examples of foundations that guide open source projects include the
Linux Foundation, the Apache Foundation, and the Eclipse Foundation.
A foundation’s support is valuable because it can provide the logistics that most software
developers don’t want to deal with: legal support such as trademarking, indemnification, and

licensing; help with raising money; infrastructure such as bug databases and web sites; and so on.

Transfer of Rights
Just as with books, music, and other creative efforts, software involves a complicated relationship
between the developers, the organizations that distribute their contributions, and the general
public. Essentially, contributors must take steps to formalize the right of an open source project to
use and distribute their code.
Thus, many open source organizations ask contributors to sign a contributor license agreement
(CLA). Sometimes, the contributor just gives the code to the project. The project owns the code and
all rights to it, just as a proprietary company owns the code that it paid its staff to develop.
Other CLAs leave some rights in the hands of the individual contributors. Contributors might like
this flexibility because they can go on to contribute the same code to another project or build their
own business around it.
To harmonize the different contributions from different people, the license assigned to the code is
crucial. The Linux kernel is one of the projects that leaves ownership in the hands of the
contributors, so that by now many thousands of people own rights to the Linux code. But all
contributors to the core code put it under the GNU General Public License (version 2). Thus, Linux
is free for all to use, alter, and redistribute.
Using a single license for all code in a project is the simplest way to guarantee that no
encumbrances hinder the code from being distributed and used. But sometimes a project allows
different parts of code to be contributed under different licenses, usually because the project
wants to take advantage of some pre-existing code that’s already released under a different
license. Licensing experts should make sure that the licenses are compatible.

Rules and Policies
Many online communities have a reputation for unrestricted speech (a cavalier idea that
“anything goes”) leading to verbal abuse and bickering. Nowadays, most open source
communities are battling that tendency, which takes hold of people all too easily. In contrast,
modern communities want people to be constructive, civil, respectful, and inclusive of everyone:
all genders, ethnic groups, personality types, and so forth.
Expectations of group members are usually specified explicitly in a code of conduct that explains
how to engage with other people on the project, both online and in person. To be effective, this
code of conduct has to be enforced by the community manager and project leaders.

Sometimes, a person who flagrantly mocks or denigrates a fellow community member is expelled
permanently or temporarily. At other times, the community manager or a colleague simply
announces publicly that the behavior violates the code of conduct and might talk to the offender
outside the forum. Often, the offender previously felt frustration, lack of attention, or burn-out,
and community members can help the offender find better ways to express themselves.
In addition to social behavior, communities establish quality standards. The most formal consist
of coding guidelines, which try to ensure that all code looks similar. The guidelines may remind
developers of good practices such as using brackets around blocks of code, or may specify details
such as how to name variables and what kinds of indentation to use.
Open source communities also have rules around releases of code or other deliverables. Some
projects establish fixed times for releases; for instance, Ubuntu promises a new long term support
(LTS) version every two years along with interim releases on a more frequent basis. Other projects
maintain a list of new features and bug fixes they want in the upcoming release and approve the
release when everything is checked off the list. But unlike most businesses, open source
communities don’t usually establish deadlines for participants, because one cannot ask too much
of volunteers.

Attribution and Transparency
In addition to the contributor license agreement mentioned earlier, some projects ask
contributors to sign a developer certificate of origin (DCO). In the DCO, the contributor promises
that they have the legal right to donate the code.
Why is the DCO important? Imagine this scenario: If a programmer takes code from a proprietary
product produced by their employer and contributes it to an open source project, the programmer
violates the employer’s license and puts the open source project at legal risk.
The DCO is supposed to ensure that the contributor actually wrote the code, or obtained it legally.
The open source project depends on the honesty of the contributor who fills out the certificate.

Diversity, Equity, Inclusivity, and Non-Discrimination
Social scientists claim that projects and companies benefit by having many people with different
genders, races, economic backgrounds, nationalities, and abilities. All organizations have a
natural human tendency to bond with other people like their current members, so a community
that values diversity and equity has to consciously train its members to be more open to people
who aren’t like them. The movement to carry out this ideal is called diversity, equity, and
inclusion (DEI).

The code of conduct is the starting point for DEI. It should explicitly welcome people of different
genders, races, etc. Every violation of the code of conduct must be handled promptly with
unambiguous disapproval. This is because some minorities have suffered from exclusion and
negative comments their whole lives, and a single bad interaction in your forum could make them
decide they have no reason to participate anymore. A speedy response to aggressions can reassure
them that the community backs them.
But DEI goes much further. The community should reach out to groups who need more
representation. For instance, if you are developing a job search app, you should make sure it
shows jobs for low-income people as well as upper-class and middle-class people. You should also
advertise the app among low-income communities and recruit members from those communities
to test it.
Your community might benefit from finding organizations that train people from marginalized
communities, and from which you can recruit new members of your team. Many such
organizations are established in local areas, and aren’t well-known nationally or internationally.
Understanding the needs of marginalized communities is key. Is your web site accessible to the
sight-impaired? Do you translate your documentation into languages with which the target
community is familiar? Perhaps you should create specific forums in other languages.
Most communication in open source communities is asynchronous and online. But if you have
meetings or synchronous chat sessions, think about where people are geographically and find
ways to include everybody. For instance, when people from many countries and regions are
communicating in English, try to keep the vocabulary and grammar simple.
Finally, if you have members of some minority on your team, make sure to listen to them. One
well-known symptom of exclusion is discounting what minorities say or just underappreciating its
importance.
On the other hand, don’t burden minority members with the need to explain their communities'
needs — everybody should be tasked with that research. The minority members might do valuable
outreach for you, but don’t pressure them to do so. Each person should have the equal
opportunity to participate the way they want, without having to be a token minority.

1. Why don’t all contributors give their code to the project and relinquish all rights to the code?

2. If someone wants to help the project but can’t program, what are some ways they can help?
