---
id: lpi-030-100-03
title: "LPIC-3 · 030-100 — CSS Content Styling, Why is it not recommended to use the style…"
slug: lpi-030-100-03-lpic-3-030-100-css-content-styling-why-is-it-not-recommended
source: "LPI Learning Material — LPIC-3 (Exam 030-100)"
sourceSection: "Topic 033: CSS Content Styling, 2. Why is it not recommended to use the style attribute of the <p> tag if there are sibling, 2. What happens if you start a comment with /* in the middle of a CSS file, but forget to close it, 4. How can you indicate that a stylesheet from a <style> or <link> tag shou"
track: linux-engineer
tier: free
tags: [linux, lpic-3, certification, software-development]
summary: "Web Development Essentials version 1.0, Exam 030, Objective 033.1 Covers 27 sections: CSS Content Styling, Why is it not recommended to use the style attribute of the <p> tag if there are sibling, What happ."
---
# LPIC-3 · 030-100 — CSS Content Styling, Why is it not recommended to use the style…

## Topic 033: CSS Content Styling

### 033.1 CSS Basics
Web Development Essentials version 1.0, Exam 030, Objective 033.1
- Embedding CSS within an HTML document
- Understand the CSS syntax
- Add comments to CSS
- Awareness of accessibility features and requirements
- HTML style and type (text/css) attributes
- <style>
- <link>, including the rel (stylesheet), type (text/css) and src attributes
- ;
- /,/

### 033.1 Lesson 1

### 033.1 CSS Basics

All web browsers render HTML pages using default presentation rules that are practical and
straightforward, but not visually appealing. HTML by itself offers few features to write elaborate
pages based on modern user experience concepts. After writing simple HTML pages, you have
probably realized they are unsightly when compared to well-designed pages found on the
Internet. This is because, in modern HTML, the markup code intended for the structure and
function of the elements in the document (i.e., the semantic content) is separate from the rules that
define how the elements should look (the presentation). The rules for presentation are written in a
different language called Cascading Style Sheets (CSS). It lets you change almost all the document’s
visual aspects, such as fonts, colors, and the placement of the elements along the page.
HTML documents are not, in most cases, intended to be displayed in a fixed layout like a PDF file.
Rather, HTML-based web pages will probably be rendered on a wide variety of screen sizes or
even be printed. CSS provides tunable options to ensure that the web page will be rendered as
intended, adjusted to the device or application that opens it.

Applying Styles
There are several ways to including CSS in an HTML document: write it directly in the element’s
tag, in a separate section of the page’s source code, or in an external file to be referenced by the
HTML page.

The style Attribute
The simplest way to modify the style of a specific element is to write it directly in the element tag
using the style attribute. All visible HTML elements allow a style attribute, whose value may be
one or more CSS rules, also known as properties. Let’s start with a simple example, a paragraph
element:
<p>My stylized paragraph</p>

The basic syntax of a customized CSS property is property: value, where property is the
particular aspect you want to change in the element and value defines the replacement for the
default option made by the browser. Some properties apply to all elements and some properties
apply only to specific elements. Likewise, there are appropriate values to be used in each
property.
To change the color of our plain paragraph, for example, we use the color property. The color
property refers to the foreground color, that is, the color of the letters in the paragraph. The color
itself goes in the value part of the rule and it can be specified in many different formats, including
simple names like red, green, blue, yellow, etc. Thus, to make the letter of the paragraph
purple, add the customized property color: purple to the style attribute of the element:
<p style="color: purple">My first stylized paragraph</p>

Other customized properties can go in the same style property, but they must be separated by
semicolons. If you want to make the font size larger, for example, add font-size: larger to the
style property:
<p style="color: purple; font-size: larger">My first stylized paragraph</p>

It’s not necessary to add spaces around the colons and semicolons, but they can
make it easier to read the CSS code.

To see the result of these changes, save the following HTML in a file and then open it in a web

browser (results are shown in Figure 32):
<p style="color: purple; font-size: larger">My first stylized paragraph</p>
<p style="color: green; font-size: larger">My second stylized paragraph</p>

Figure 32. A very simple visual change using CSS.

You can imagine every element in the page as a rectangle or a box whose geometric properties
and decorations you can manipulate with CSS. The rendering mechanism uses two basic standard
concepts for element placement: block placement and inline placement. Block elements occupy all
the horizontal space of their parent element and are placed sequentially, from top to bottom.
Their height (their vertical dimension, not to be confused with their top position in the page)
generally depends on the amount of content they have. Inline elements follow the left-to-right
method similar to Western written languages: elements are placed horizontally, from left to right,
until there is no more space in the right side, whereupon the element continues on a new line just
under the current one. Elements such as p, div, and section are placed as blocks by default,
whereas elements such as span, em, a, and single letters are placed inline. These basic placement
methods can be fundamentally modified by CSS rules.
The rectangle corresponding to the p element in the body of the sample HTML document will be
visible if you add the background-color property to the rule (Figure 33):
<p style="color: purple; font-size: larger; background-color: silver">My first stylized
paragraph</p>

<p style="color: green; font-size: larger; background-color: silver">My second stylized
paragraph</p>

Figure 33. Rectangles corresponding to the paragraphs.

As you add new CSS customized properties to the style attribute, you’ll note that the overall code
starts to get cluttered. Writing too many CSS rules in the style attribute undermines the
separation of structure (HTML) and presentation (CSS). Moreover, you’ll soon realize that many
styles are shared among different elements and it is not wise to repeat them in every element.

CSS Rules
Rather than styling the elements directly in their style attributes, it is much more practical to tell
the browser about the entire collection of elements to which the custom style applies. We do it by
adding a selector to the customized properties, matching elements by type, class, unique ID,
relative position, etc. The combination of a selector and corresponding customized
properties — also known as declarations — is called a CSS rule. The basic syntax of a CSS rule is
selector { property: value }. As in the style attribute, properties separated by semicolons
can be grouped together, as in p { color: purple; font-size: larger }. This rule matches
every p element in the page and applies the customized color and font-size properties.
A CSS rule for a parent element will automatically match all its children elements. This means that
we could apply the customized properties to all text in the page, regardless of whether it is inside
or outside a <p> tag, by using the body selector instead: body { color: purple; font-size:
larger }. This strategy frees us from writing the same rule again for all its children, but it may
be necessary to write additional rules to “undo” or to modify the inherited rules.

The style Tag
The <style> tag lets us write CSS rules inside the HTML page we want to style. It allows the
browser to differentiate the CSS code from the HTML code. The <style> tag goes in the head
section of the document:

<style type="text/css">
p { color: purple; font-size: larger }
<p>My first stylized paragraph</p>
<p>My second stylized paragraph</p>

The type attribute tells the browser what kind of content is inside the <style> tag, i.e. its MIME
type. Because every browser that supports CSS assumes that the type of the <style> tag is
text/css by default, including the type attribute is optional. There is also a media attribute that
indicates the media — computer screens or printing, for example — to which the CSS rules in the
<style> tag apply. By default, the CSS rules apply to any medium where the document is
rendered.
As in HTML code, line breaks and code indentation do not change how the CSS rules are
interpreted by the browser. Writing:
<style type="text/css">
p { color: purple; font-size: larger }

has the exact same result as writing:
<style type="text/css">

font-size: larger;

The extra bytes used by the spaces and line-breaks make little difference in the final size of the
document and do not have a significant impact on page’s loading time, so the choice of layout is a
matter of taste. Note the semicolon after the last declaration (font-size: larger;) of the CSS
rule. That semicolon is not mandatory, but having it there makes it easier to add another
declaration in the next line without worrying about missing semicolons.
Having the declarations in separate lines also helps when you need to comment out a declaration.
Whenever you want to temporarily disable a declaration for troubleshooting reasons, for
example, you can enclose the corresponding line with /* and */:
/*
font-size: larger;
*/

or:
/* font-size: larger; */

Written like this, the font-size: larger declaration will be ignored by the browser. Be careful
to open and close the comments properly, otherwise the browser may be not able to interpret the
rules.
Comments are also useful to write reminders about the rules:
/* Texts inside <p> are purple and larger */
font-size: larger;

Reminders like the one in the example are expendable in stylesheets containing a small number
of rules, but they are essential to help navigate stylesheets with hundreds (or more) rules.
Even though the style attribute and the <style> tag are adequate for testing custom styles and
useful for specific situations, they are not commonly used. Instead, CSS rules are usually kept in a
separate file that can be referenced from the HTML document.

CSS in External Files
The preferred method to associate CSS definitions with an HTML document is to store the CSS in a
separate file. This method offers two main advantages over the previous ones:
- The same styling rules can be shared among distinct documents.
- The CSS file is usually cached by the browser, improving future loading times.
CSS files have the .css extension and, like HTML files, they can be edited by any plain text editor.
Unlike HTML files, CSS files have no top level structure built with hierarchical tags such as <head>
or <body>. Rather, the CSS file is just a list of rules processed in sequential order by the browser.
The same rules written inside a <style> tag could instead go in a CSS file.
The association between the HTML document and the CSS rules stored in a file is defined in the
HTML document only. To the CSS file, it does not matter whether elements matching its rules
exist, so there is no need to enumerate in the CSS file the HTML documents it is linked to. On the
HTML side, every linked stylesheet will be applied to the document, just as if the rules were
written in a <style> tag.
The <link> HTML tag defines an external stylesheet to be used in the current document and
should go in the head section of the HTML document:
<link href="style.css" rel="stylesheet">

Now you can place the rule for the p element we used before into the style.css file, and the
results seen by the visitor to the web page will be the same. If the CSS file is not in the same
directory as the HTML document, specify its relative or full path in the href attribute. The <link>
tag can refer to different types of external resources, so it is important to establish what

relationship the external resource has with the current document. For external CSS files, the
relationship is defined in rel="stylesheet".
The media attribute can be used in the same way as for the <style> tag: it indicates the media,
such as computer screens or printing, to which the rules in the external file should apply.
CSS can completely change an element, but it is still important to use the appropriate element for
the components of the page. Otherwise, assistive technologies such as screen-readers may not be
able to identify the correct sections of the page.

1. What methods can be used to change the appearance of HTML elements using CSS?

## 2. Why is it not recommended to use the style attribute of the <p> tag if there are sibling
paragraphs that should look the same?

3. What is the default placement policy for placing a div element?

4. What attribute of the <link> tag indicates the location of an external CSS file?

5. What is the correct section to insert the link element inside an HTML document?

1. Why is it not recommended to use a <div> tag to identify a word in an ordinary sentence?

## 2. What happens if you start a comment with /* in the middle of a CSS file, but forget to close it
with */?

3. Write a CSS rule to draw an underline in all em elements of the document.

## 4. How can you indicate that a stylesheet from a <style> or <link> tag should be used only by
speech synthesizers?

This lesson covers the basic concepts of CSS and how to integrate it with HTML. Rules written in
CSS stylesheets are the standard method to change the appearance of HTML documents. CSS
allows us to keep the semantic content separate from the presentation policies. This lesson goes
through the following concepts and procedures:
- How to change CSS properties using the style attribute.
- The basic CSS rule syntax.
- Using the <style> tag to embed CSS rules in the document.
- Using the <link> tag to incorporate external stylesheets to the document.

1. What methods can be used to change the appearance of HTML elements using CSS?
Three basic methods: Write it directly in the element’s tag, in a separate section of the page’s
source code, or in an external file to be referenced by the HTML page.
2. Why is it not recommended to use the style attribute of the <p> tag if there are sibling
paragraphs that should look the same?
The CSS declaration will need to be replicated in the other <p> tags, which is time consuming,
increases the file size, and it is prone to errors.
3. What is the default placement policy for placing a div element?
The div element is treated as a block element by default, so it will occupy all the horizontal
space of its parent element and its height will depend on its contents.
4. What attribute of the <link> tag indicates the location of an external CSS file?
The href attribute.
5. What is the correct section to insert the link element inside an HTML document?
The link element should be in the head section of the HTML document.

1. Why it is not recommended to use a <div> tag to identify a word in an ordinary sentence?
The <div> tag provides a semantic separation between two distinct sections of the document
and interferes with accessibility tools when it is used for inline text elements.
2. What happens if you start a comment with /* in the middle of a CSS file, but forget to close it
with */?
All the rules after the comment will be ignored by the browser.
3. Write a CSS rule to draw an underline in all em elements of the document.
em { text-decoration: underline }
or
em { text-decoration-line: underline }
4. How can you indicate that a stylesheet from a <style> or <link> tag should be used only by
speech synthesizers?
The value of its media attribute must be speech.

### 033.2 CSS Selectors and Style Application
Web Development Essentials version 1.0, Exam 030, Objective 033.2
- Use selectors to apply CSS rules to elements
- Understand CSS pseudo-classes
- Understand rule order and precedence in CSS
- Understand inheritance in CSS
- element; .class; #id
- a, b; a.class; a b;
- :hover, :focus
- !important

### 033.2 Lesson 1

### 033.2 CSS Selectors and Style Application

When writing a CSS rule, we must tell the browser to which elements the rule applies. We do so by
specifying a selector: a pattern that can match an element or group of elements. Selectors come in
many different forms, which can be based on the element’s name, its attributes, its relative
placement in the document structure, or a combination of these characteristics.

Page-Wide Styles
One of the advantages of using CSS is that you do not need to write individual rules to elements
sharing the same style. An asterisk applies the rule to all elements in the web page, as shown in
the following example:
font-size: large;

The * selector is not the only method to apply a style rule to all elements in the page. A selector
that simply matches an element by its tag name is called a type selector, so any HTML tag name
such as body, p, table, em, etc., can be used as selectors. In CSS, the parent’s style is inherited by its
children elements. So, in practice, using the * selector has the same effect as applying a rule to the
body element:
font-size: large;

Furthermore, the cascading feature of CSS allows you to fine tune the inherited properties of an
element. You can write a general CSS rule that applies to all elements in the page, and then write
rules for specific elements or sets of elements.
If the same element matches two or more conflicting rules, the browser applies the rule from the
most specific selector. Take the following CSS rules as an example:
font-size: large;
font-size: small;

The browser will apply the color: purple and font-size: large styles to all elements inside
the body element. However, if there are li elements in the page, the browser will replace the
font-size: large style by the font-size: small style, because the li selector has a stronger
relationship with the li element than the body selector does.
CSS does not limit the number of equivalent selectors in the same stylesheet, so you can have two
or more rules using the same selector:
font-size: small;
font-size: x-small;

In this case, both rules are equally specific to the li element. The browser cannot apply
conflicting rules, so it will choose the rule that comes later in the CSS file. To avoid confusion, the
recommendation is to group together all properties that use the same selector.
The order in which the rules appear in the stylesheet affect how they are applied in the document,
but you can override this behavior by using an important rule. If, for any reason, you want to
keep the two separate li rules, but force the application of the first one instead of the second one,
mark the first rule as important:
font-size: small !important;
font-size: x-small;

Rules marked with !important should be used with caution, because they break the natural
stylesheet cascading and make it harder to find and correct problems within the CSS file.

Restrictive Selectors
We saw that we can change certain inherited properties by using selectors matching specific tags.
However, we usually need to use distinct styles for elements of the same type.
Attributes of HTML tags can be incorporated into selectors to restrict the set of elements they refer
to. Suppose the HTML page you are working on has two types of unordered lists (<ul>): one is
used at the top of the page as a menu to the sections of the website and the other type is used for
conventional lists in the text body:
<link rel="stylesheet" href="style.css">

<div id="content">
<p>The three rocky planets of the solar system are:</p>
<li>Mercury</li>
<li>Venus</li>
<li>Earth</li>
<li>Mars</li>
<p>The outer giant planets made most of gas are:</p>
<li>Jupiter</li>
<li>Saturn</li>
<li>Uranus</li>
<li>Neptune</li>
</div><!-- #content -->

<div id="footer">
</div><!-- #footer -->

By default, each list item has a black circle to its left. You may want to remove the circles from the
top menu list while leaving the circles in the other list. However, you cannot simply use the li

selector because doing so will also remove the circles in the list inside the text body section. You
will need a way to tell the browser to modify only the list items used in one list, but not the other.
There are several ways to write selectors matching specific elements in the page. As mentioned
earlier, we will first see how to use the elements' attributes to do so. For this example in
particular, we can use the id attribute to specify the top list only.
The id attribute assigns a unique identifier to the corresponding element, which we can use as the
selector part of the CSS rule. Before writing the CSS rule, edit the sample HTML file and add
id="topmenu" to the ul element used for the top menu:
<ul id="topmenu">
<li>Home</li>
<li>Articles</li>
<li>About</li>

There is already a link element in the head section of the HTML document pointing to the
style.css stylesheet file in the same folder, so we can add the following CSS rules to it:
ul#topmenu {
list-style-type: none

The hash character is used in a selector, following an element, to designate an ID (without spaces
separating them). The tag name to the left of the hash is optional, as there will be no other element
with the same ID. Therefore, the selector could be written just as #topmenu.
Even though the list-style-type property is not a direct property of the ul element, CSS
properties of the parent element are inherited by its children, so the style assigned to the ul
element will be inherited by its child li elements.
Not all elements have an ID by which they can be selected. Indeed, only a few key layout elements
in a page are expected to have IDs. Take the lists of planets used in the sample code, for instance.
Although it is possible to assign unique IDs for each individual repeated element like these, this
method is not practical for longer pages with lots of contents. Rather, we can use the parent div
element’s ID as the selector to change the properties of its inner elements.
However, the div element is not directly related to HTML lists, so adding the list-style-type
property to it will have no effect on its children. Thus, to change the black circle in the lists inside
the content div to a hollow circle, we should use a descendant selector:

#topmenu {
list-style-type: none
#content ul {
list-style-type: circle

The #content ul selector is called a descendant selector because it matches only the ul elements
that are children of the element whose ID is content. We can use as many levels of descendance
as necessary. For instance, using #content ul li would match only the li elements that are
descendants of ul elements that are descendants of the element whose ID is content. But in this
example, the longer selector will have the same effect as using #content ul, because the li
elements inherit the CSS properties set to their parent ul. Descendant selectors are an essential
technique as the page layout grows in complexity.
Let’s say that now you want to change the font-style property of the list items in the topmenu
list and in the list in the footer div to make them look oblique. You can’t simply write a CSS rule
using ul as the selector, because it will also change the list items in the content div. So far, we have
changed CSS properties using one selector at a time, and this method can also be used for this
task:
#topmenu {
#footer ul {

Separate selectors are not the only way to do it, though. CSS allow us to group together selectors
that share one or more styles, using a list of selectors separated by commas:
#topmenu, #footer ul {

Grouping selectors eliminates the extra work of writing duplicate styles. Furthermore, you may
want to change the property again in the future and may not remember to change it in all the
different places.

Classes
If you do not want to worry too much about the element hierarchy, you can simply add a class to
the set of elements you want to customize. Classes are similar to IDs, but instead of identifying
only a single element in the page, they can identify a group of elements sharing the same
characteristics.
Take the sample HTML page we are working on, for instance. It’s unlikely that in real-world pages
we will find structures simple as that, so it would be more practical to select an element using
classes only, or a combination of classes and descendancy. To apply the font-style: oblique
property to the menu lists using classes, first we need to add the class property to the elements
in the HTML file. We’ll do it first in the top menu:
<ul id="topmenu" class="menu">

And then in the footer’s menu:
<div id="footer">
<ul class="menu">
</div><!-- #footer -->

With that, we can replace the selector group #topmenu, #footer ul by the class-based selector
.menu:
.menu {

As with the ID-based selectors, adding the tag name to the left of the dot in class-based selectors is
optional. However, unlike IDs, the same class is supposed to be used in more than one element

and they do not even need to be of the same type. Therefore, if the menu class is shared among
different element types, using the ul.menu selector would match only the ul elements having the
menu class. Instead, using .menu as the selector will match any element having the menu class,
regardless of its type.
Furthermore, elements can be associated to more than one class. We could differentiate between
the top and the bottom menu by adding an extra class to each one of them:
<ul id="topmenu" class="menu top">

And in the footer’s menu:
<ul class="menu footer">

When the class attribute has more than one class, they must be separated by spaces. Now, in
addition to the CSS rule shared between elements of the menu class, we can address the top and
footer menu using their corresponding classes:
.menu {
.menu.top {
font-size: large
.menu.footer {
font-size: small

Be aware that writing .menu.top differs from .menu .top (with a space between the words). The
first selector will match elements that have both menu and top classes, whereas the second will
match elements that have the top class and a parent element with the menu class.

Special Selectors
CSS selectors can also match dynamic states of elements. These selectors are particularly useful
for interactive elements, such as hyperlinks. You may want the appearance of hyperlinks when
the mouse pointer moves over them, to draw the visitor’s attention.

Back to our sample page, we could remove the underlines from the links in the top menu and
show a line only when the mouse pointer moves over the corresponding link. To do this, we first
write a rule to remove the underline from the links in the top menu:
.menu.top a {
text-decoration: none

Then we use the :hover pseudo-class on those same elements to create a CSS rule that will apply
only when the mouse pointer is over the corresponding element:
.menu.top a:hover {
text-decoration: underline

The :hover pseudo-class selector accepts all the CSS properties of conventional CSS rules. Other
pseudo-classes include :visited, which matches hyperlinks that have already been visited, and
:focus, which matches form elements that have received focus.

## 1. Suppose an HTML page has a stylesheet associated to it, containing the two following rules:
color: green;
color: red;

What color will the browser apply to the text inside the p elements?

2. What is the difference between using the ID selector div#main and #main?

3. Which selector matches all p elements used inside a div with ID attribute #main?

4. What is the difference between using the class selector p.highlight and .highlight?

## 1. Write a single CSS rule that changes the font-style property to oblique. The rule must
match only a elements that are inside <div
id="sidebar"></div> or <ul
class="links"></ul>.

## 2. Suppose you want to change the style of the elements whose class attribute is set to article
reference, as in <p class="article reference">. However, the .article .reference
selector does not appear to alter their appearance. Why is the selector not matching the
elements as expected?

3. Write a CSS rule to change the color property of all visited links in the page to red.

This lesson covers how to use CSS selectors and how the browser decides what styles to apply to
each element. Being separate from the HTML markup, CSS provides many selectors to match
individual elements or groups of elements in the page. The lesson goes through the following
concepts and procedures:
- Page wide styles and style inheritance.
- Styling elements by type.
- Using the element ID and class as the selector.
- Compound selectors.
- Using pseudo-classes to style elements dynamically.

## 1. Suppose an HTML page has a stylesheet associated to it, containing the two following rules:
color: green;
color: red;

What color will the browser apply to the text inside the p elements?
The color red. When two or more equivalent selectors have conflicting properties, the browser
will choose the last one.
2. What is the difference between using the ID selector div#main and #main?
The selector div#main matches a div element having the ID main, whereas the #main selector
matches the element having the ID main, regardless of its type.
3. Which selector matches all p elements used inside a div with ID attribute #main?
The selector #main p or div#main p.
4. What is the difference between using the class selector p.highlight and .highlight?
The selector p.highlight matches only the elements of type p having the class highlight,
whereas the .highlight selector matches all elements having the class highlight, regardless
of their type.

## 1. Write a single CSS rule that changes the font-style property to oblique. The rule must
match only a elements that are inside <div
id="sidebar"></div> or <ul
class="links"></ul>.
#sidebar a, ul.links a {

## 2. Suppose you want to change the style of the elements whose class attribute is set to article
reference, as in <p class="article reference">. However, the .article .reference
selector does not appear to alter their appearance. Why is the selector not matching the
elements as expected?
The .article .reference selector will match the elements having the class reference that
are descendants of elements having the class article. To match elements having both
article and reference classes, the selector should be .article.reference (without the
space between them).
3. Write a CSS rule to change the color property of all visited links in the page to red.
a:visited {
color: red;

### 033.3 CSS Styling
Web Development Essentials version 1.0, Exam 030, Objective 033.3
- Understand fundamental CSS properties
- Understand units commonly used in CSS
- px, %, em, rem, vw, vh
- color, background, background-*, font, font-*, text-*, list-style, line-height

### 033.3 Lesson 1

### 033.3 CSS Styling

CSS provides hundreds of properties that can be used to modify the appearance of HTML
elements. Only experienced designers manage to remember most of them. Nevertheless, it is
practical to know the basic properties that are applicable to any element, as well as some elementspecific properties. This chapter covers some popular properties you are likely to use.

CSS Common Properties and Values
Many CSS properties have the same value type. Colors, for example, have the same numerical
format whether you are changing the font color or the background color. Similarly, the units
available to change the size of the font are also used to change the thickness of a border. However,
the format of the value is not always unique. Colors, for example, can be entered in various
different formats, as we will see next.

Colors
Changing the color of an element is probably one of the first things designers learn to do with CSS.

You can change the color of the text, the background color, the color of the border of elements,
and more.
The value of a color in CSS can be written as a color keyword (i.e. a color name) or as a numerical
value listing each color component. All common color names, such as black, white, red, purple,
green, yellow, and blue are accepted as color keywords. The entire list of color keywords
accepted by CSS is available at a W3C web page. But to have finer control over the color, you can
use the numerical value.

Color Keywords
We’ll use the color keyword first, because it’s simpler. The color property changes the color of
the text in the corresponding element. So to put all the text on the page in purple, you could write
the following CSS rule:

Numerical Color Values
Although intuitive, color keywords do not offer the complete range of possible colors in modern
displays. Web designers usually develop a color palette that employs custom colors, by assigning
specific values to the red, green, and blue components.
Each color component is an eight-bit binary number, ranging from 0 to 255. All three components
must be specified in the color mixture, and their order is always red, green, blue. Therefore, to
change the color for all the text in the page to red using RGB notation, use rgb(255,0,0):
color: rgb(255,0,0);

A component set to 0 means that the corresponding basic color is not used in the color mixture.
Percentages can also be used instead of numbers:
color: rgb(100%,0%,0%);

The RGB notation is rarely seen if you use a drawing application to create layouts or just to pick its
colors. Rather, it is more common to see colors in CSS expressed as hexadecimal values. The color
components in hexadecimal also range from 0 to 255, but in a more succinct way, starting with a
hash symbol # and using a fixed two-digit length for all components. The minimal value 0 is 00
and the maximum value 255 is FF, so the color red is #FF0000.

If the digits in each component of a hexadecimal color repeat, the second digit can be
omitted. The color red, for example, can be written with a single digit for each
component: #F00.

The following list shows the RGB and hexadecimal notation for some basic colors:
Color Keyword

RGB Notation

Hexadecimal Value

black

rgb(0,0,0)

#000000

white

rgb(255,255,255)

#FFFFFF

red

rgb(255,0,0)

#FF0000

purple

rgb(128,0,128)

#800080

green

rgb(0,128,0)

#008000

yellow

rgb(255,255,0)

#FFFF00

blue

rgb(0,0,255)

#0000FF

Color keywords and the letters in hexadecimal color values are case-insensitive.

Color Opacity
In addition to opaque colors, it is possible to fill page elements with semi-transparent colors. The
opacity of a color can be set using a fourth component in the color value. Unlike the other color
components, where the values are integer numbers ranging from 0 to 255, the opacity is a fraction
ranging from 0 to 1.
The lowest value, 0, results in a completely transparent color, making it undistinguishable from
any other fully transparent color. The highest value, 1, results in a fully opaque color, which is the
same as the original color with no transparency at all.
When you use the RGB notation, specify colors with an opacity component through the rgba
prefix instead of rgb. Thus, to make the color red half-transparent, use rgba(255,0,0,0.5). The
a character stands for alpha channel, a term commonly used to specify the opacity component in
digital graphics jargon.

The opacity can also be set in the hexadecimal notation. Here, like the other color components, the
opacity ranges from 00 to FF. Therefore, to make the color red half-transparent using
hexadecimal notation, use #FF000080.

Background
The background color of single elements or of the entire page is set with the background-color
property. It takes the same values as the color property, either as keywords or using the
RGB/hexadecimal notation.
The background of HTML elements is not restricted to colors, though. With the backgroundimage property it is possible to use an image as the background. The accepted image formats are
all the conventional ones accepted by the browser, such as JPEG and PNG.
The path to the image should be specified using an url() designator. If the image you want to use
is in the same folder as the HTML file, it is enough to use only its filename:

In this example, the background.jpg image file will be used as the background image for the
entire body of the page. By default, the background image is repeated if its size does not cover the
entire page, starting from the top-left corner of the area corresponding to the rule’s selector. This
behavior can be modified with the background-repeat property. If you want the background
image to be placed in the element’s area without repeating it, use the no-repeat value:
background-repeat: no-repeat;

You can also make the image repeat only in the horizontal direction (background-repeat:
repeat-x) or only in the vertical direction (background-repeat: repeat-y).

Figure 34. Background placement using the background-repeat property.

Two or more CSS properties can be combined in a single property, called the
background shorthand property. The background-image and background-repeat
properties, for example, can be combined in a single background property with
background: no-repeat url("background.jpg").

A background image can also be placed in a specific position in the element’s area using the
background-position property. The five basic positions are top, bottom, left, right and
center, but the top-left position of the image can also be adjusted with percents:
background-repeat: no-repeat;
background-position: 30% 10%;

The percent for each position is relative to the corresponding size of the element. In the example,
the background image left side will be at 30% of the body’s width (usually the body is the entire
visible document) and the top side of the image will be at 10% of the body’s height.

Borders
Changing an element’s border is also a common layout customization made with CSS. The border
refers to the line forming a rectangle around the element and has three basic properties: color,
style and width.
The color of the border, defined with border-color, follows the same format we saw for the
other color properties.
Borders can be traced in a style other than a solid line. You could, for example, use dashes for the
border with the property border-style: dashed. The other possible style values are:
dotted
A sequence of rounded dots
double
Two straight lines
groove
A line with a carved appearance
ridge
A line with an extruded appearance
inset
An element that appears embedded
outset
An element that appears embossed
The border-width property set the thickness of the border. Its value can be a keyword (thin,
medium or thick) or a specific numerical value. If you prefer to use a numerical value, you will
also need to specify its corresponding unit. This is described next.

Unit Values
Sizes and distances in CSS can be defined in various ways. Absolute units are based on a fixed
number of screen pixels, so they are not so different from the fixed sizes and dimensions used in
printed media. There are also relative units, which are dynamically calculated from some
measurement given by the media where the page is being rendered, like the available space or
another size written in absolute units.

Absolute Units
Absolute units are equivalent to their physical counterparts, like centimeters or inches. On
conventional computer screens, one inch will be 96 pixels wide. The following absolute units are
commonly used:
in (inch)
1 in is equivalent to 2.54 cm or 96 px.
cm (centimeter)
1 cm is equivalent to 96 px / 2.54.
mm (millimeter)
1 mm is equivalent to 1 cm / 10.
px (pixel)
1 px is equivalent to 1 / 96th of an inch.
pt (point)
1pt is equivalent to 1 / 72th of an inch.
Keep in mind that the ratio of pixels to inch may vary. In high resolution screens, where pixels are
more densely packed, an inch will correspond to more than 96 pixels.

Relative Units
Relative units vary according to other measurements or to the viewport dimensions. The viewport
is the area of the document currently visible in its window. In full screen mode, the viewport
corresponds to the device screen. The following relative units are commonly used:
%
Percentage — it is relative to the parent element.
em
The size of the font used in the element.
rem
The size of the font used in the root element.
vw
1% of the viewport’s width.

vh
1% of the viewport’s height.
The advantage of using relative units is that you can create layouts that are adjustable by
changing only a few key sizes. For example, you can use the pt unit to set the font size in the body
element and the rem unit for the fonts in other elements. Once you change the size of font for the
body, all the other font sizes will adjust accordingly. Furthermore, using vw and vh to set the
dimensions of page sections makes them adjustable to screens with different sizes.

Fonts and Text Properties
Typography, or the study of font types, is a very broad design subject, and CSS typography does
not lag behind. However, there are a few basic font properties that will meet the needs of most
users learning CSS.
The font-family property sets the name of the font to be used. There is no guarantee that the
chosen font will be available in the system where the page will be viewed, so this property may
have no effect in the document. Although it is possible to make the browser download and use the
specified font file, most web designers are happy using a generic font family in their documents.
The three most common generic font families are serif, sans-serif and monospace. Serif is the
default font family in most browsers. If you prefer to use sans-serif for the entire page, add the
following rule to your stylesheet:
font-family: sans-serif;

Optionally, you can first set a specific font family name, followed by the generic family name:
font-family: "DejaVu Sans", sans-serif;

If the device rendering the page has that specific font family, the browser will use it. If not, it will
use its default font matching the generic family name. Browsers search for fonts in the order they
are specified in the property.
Anyone who has used a word processing application will also be familiar with three other font
adjustments: size, weight, and style. These three adjustments have CSS properties counterparts:

font-size, font-weight, and font-style.
The font-size property accepts keyword sizes such as xx-small, x-small, small, medium,
large, x-large, xx-large, xxx-large. These keywords are relative to the default font size used
by the browser. The keywords larger and smaller change the font size relative to the parent’s
element font size. You can also express the font size with numerical values, including the unit
after the value, or with percentages.
If you do not want to change the font size, but the distance between lines, use the line-height
property. A line-height of 1 will make the line height the same size of the font of the element,
which can make the text lines too close together. Therefore, a value greater than 1 is more
appropriate for texts. Like the font-size property, other units can be used together with the
numerical value.
The font-weight sets the thickness of the font with the familiar keywords normal or bold. The
keywords lighter and bolder change the font weight of the element relative to the font weight
of its parent element.
The font-style property can be set to italic to select the italic version of the current font
family. The oblique value selects the oblique version of the font. These two options are almost
identical, but the italic version of a font is usually a little more narrow than the oblique version. If
neither italic nor oblique versions of the font exist, the font will be artificially tilted by the
browser.
There are other properties that change the way text is rendered in the document. You can, for
example, add an underline to some parts of the text you want to emphasize. First, use a <span>
tag to delimit the text:
<p>CSS is the <span class="under">proper mechanism</span> to style HTML documents.</p>

Then you can use the .under selector to change the text-decoration property:
.under {
text-decoration: underline;

By default, all a (link) elements are underlined. If you want to remove it, use the none value for
the text-decoration of all a elements:
a {

text-decoration: none;

When reviewing content, some authors like to cross out incorrect or outdated parts of the text, so
that the reader will know the text has been updated and what has been removed. To do so, use the
line-through value of the text-decoration property:
.disregard {
text-decoration: line-through;

Again, a <span> tag can be used to apply the style:
<p>Netscape Navigator <span class="disregard">is</span> was one of the most popular Web
browsers.</p>

Other decorations may be specific to an element. The circles in bullet point lists can be customized
using the list-style-type property. To change them to squares, for example, use list-styletype: square. To simply remove them, set the value of list-style-type to none.

## 1. How could you add half-transparency to the color blue (RGB notation rgb(0,0,255)) in order
to use it in the CSS color property?

2. What color corresponds to the #000 hexadecimal value?

## 3. Given that Times New Roman is a serif font and that it will not be available in all devices,
how could you write a CSS rule to request Times New Roman while setting the serif generic
font family as a fallback?

## 4. How could you use a relative size keyword to set the font size of the element <p
class="disclaimer"> smaller in relation to its parent element?

1. The background property is a shorthand to set more than one background-* property at once.
Rewrite the following CSS rule as a single background shorthand property.
background-repeat: repeat-x;

## 2. Write a CSS rule for the element <div id="header"></div> that changes only its bottom
border width to 4px.

3. Write a font-size property that doubles the font size used in the page’s root element.

## 4. Double-spacing is a common text formatting feature in word processors. How could you set a
similar format using CSS?

This lesson covers the application of simple styles to elements of an HTML document. CSS
provides hundreds of properties, and most web designers will need to resort to reference manuals
to remember them all. Nonetheless, a relatively small set of properties and values are used most
of the time, and it is important to know them by heart. The lesson goes through the following
concepts and procedures:
- Fundamental CSS properties dealing with colors, backgrounds, and fonts.
- The absolute and relative units CSS can use to set sizes and distances, such as px, em, rem, vw,
vh, etc.

## 1. How could you add half-transparency to the color blue (RGB notation rgb(0,0,255)) in order
to use it in the CSS color property?
Use the rgba prefix and add 0.5 as the fourth value: rgba(0,0,0,0.5).
2. What color corresponds to the #000 hexadecimal value?
The color black. The #000 hexadecimal value is a shorthand for #000000.
3. Given that Times New Roman is a serif font and that it will not be available in all devices,
how could you write a CSS rule to request Times New Roman while setting the serif generic
font family as a fallback?
font-family: "Times New Roman", serif;

## 4. How could you use a relative size keyword to set the font size of the element <p
class="disclaimer"> smaller in relation to its parent element?
Using the smaller keyword:
p.disclaimer {
font-size: smaller;

1. The background property is a shorthand to set more than one background-* property at once.
Rewrite the following CSS rule as a single background shorthand property.
background-repeat: repeat-x;

background: repeat-x url("background.jpg");

## 2. Write a CSS rule for the element <div id="header"></div> that changes only its bottom
border width to 4px.
#header {
border-bottom-width: 4px;

3. Write a font-size property that doubles the font size used in the page’s root element.
The rem unit corresponds to the font size used in the root element, so the property should be
font-size: 2rem.
4. Double-spacing is a common text formatting feature in word processors. How could you set a
similar format using CSS?
Set the line-height property to the value 2em, because the em unit corresponds to the font
size of the current element.

### 033.4 CSS Box Model and Layout
Web Development Essentials version 1.0, Exam 030, Objective 033.4
- Define the dimension, position and alignment of elements in a CSS layout
- Specify how text flows around other elements
- Understand the document flow
- Awareness of the CSS grid
- Awareness of responsive web design
- Awareness of CSS media queries
- width, height, padding, padding-*, margin, margin-*, border, border-*
- top, left, right, bottom
- display: block | inline | flex | inline-flex | none
- position: static | relative | absolute | fixed | sticky
- float: left | right | none
- clear: left | right | both | none

### 033.4 Lesson 1

### 033.4 CSS Box Model and Layout

Each visible element in an HTML document is rendered as a rectangular box. Thus, the term box
model descibes the approach CSS takes to modifying the visual properties of the elements. Like
boxes of different sizes, HTML elements can be nested inside container elements — usually the
div element — so they can be segregated in sections.
We can use CSS to modify the position of the boxes, from minor adjustments to drastic changes in
the disposition of the elements on the page. Besides the normal flow, the position for each box can
be based on the elements around it, either its relationship to its parent container or its
relationship to the viewport, which is the area of the page visible to the user. No single mechanism
meets all possible layout requirements, so you may require a combination of them.

Normal Flow
The default way the browser renders the document tree is called normal flow. The rectangles
corresponding to the elements are placed more or less in the same order they appear in the
document tree, relative to their parent elements. Nevertheless, depending on the element type, the
corresponding box may follow distinct positioning rules.

A good way to understand the logic of the normal flow is to make the boxes visible. We can start
with a very basic page, having only three separate div elements, each one having a paragraph
with random text:
<title>CSS Box Model and Layout</title>
<link rel="stylesheet" href="style.css">
<div id="first">
<h2>First div</h2>
<p><span>Sed</span> <span>eget</span> <span>velit</span>
<span>id</span> <span>ante</span> <span>tempus</span>
<span>porta</span> <span>pulvinar</span> <span>et</span>
<span>ex.</span></p>
</div><!-- #first -->
<div id="second">
<h2>Second div</h2>
<p><span>Fusce</span> <span>vitae</span> <span>vehicula</span>
<span>neque.</span> <span>Etiam</span> <span>maximus</span>
<span>vulputate</span> <span>neque</span> <span>eu</span>
<span>lobortis.</span> <span>Phasellus</span> <span>condimentum,</span>
<span>felis</span> <span>eget</span> <span>eleifend</span>
<span>aliquam,</span> <span>dui</span> <span>dolor</span>
<span>bibendum</span> <span>leo.</span></p>
</div><!-- #second -->
<div id="third">
<h2>Third div</h2>
<p><span>Pellentesque</span> <span>ornare</span> <span>ultricies</span>
<span>elementum.</span> <span>Morbi</span> <span>vulputate</span>
<span>pretium</span> <span>arcu,</span> <span>sed</span>
<span>faucibus.</span></p>
</div><!-- #third -->

Every word is in a span element so we can style the words and see how they are treated as boxes
as well. To make the boxes visible, we must edit the stylesheet file style.css referenced by the
HTML document. The following rules will do what we need:
font-family: sans;
font-size: 14pt;
div {
border: 2px solid #00000044;
#second {
background-color: #4e9a06ff;
#third {
background-color: #5c3566da;
h2 {
span {
background-color: #ffffffaa;

The result appears in Figure 35.

Figure 35. The basic element flow is from top to bottom and left to right.

Figure 35 shows that each HTML tag has a corresponding box in the layout. The div, h2, and p
elements extend to the width of their parent element. For instance, the parent element of the div
elements is the body element, so they extend to the width of the body, while the parent of each h2
and p element is its corresponding div. The boxes that extend to the width of their parent element
are called block elements. Some of the most common HTML tags rendered as blocks are h1, h2, h3,
p, ul, ol, table, li, div, section, form, and aside. Sibling block elements — block elements
sharing the same immediate parent element — are stacked inside their parent from top to bottom.

Some block elements are not intended to be used as containers for other block
elements. It is possible, for example, to insert a block element inside a h1 or p
element, but it is not considered best practice. Rather, the designer should use an
appropriate tag as a container. Common container tags are div, section, and
aside.

Besides text itself, elements such as h1, p, and li expect only inline elements as children. Like
most Western scripts, inline elements follow the left-to-right flow of text. When there is no
remaining room in the right side, the flow of inline elements continues in the next line, just like
text. Some common HTML tags treated as inline boxes are span, a, em, strong, img, input, and
label.
In our sample HTML page, every word inside the paragraphs was surrounded by a span tag, so
they could be highlighted with a corresponding CSS rule. As shown in the image, each span
element is placed horizontally, from left to right, until there is no more room in the parent
The height of the element depends on its contents, so the browser adjusts the height of a container
element to accommodate its nested block elements or lines of inline elements. However, some CSS

properties affect a box’s shape, its position, and the placement of its inner elements.
The margin and padding properties affect all box types. If you do not set these properties
explicitly, the browser sets some of them using standard values. As seen in Figure 35, the h2 and p
elements were rendered with a gap between them. These gaps are the top and bottom margins the
browser adds to these elements by default. We can remove them by modifying the CSS rules for
the h2 and p selectors:
h2 {
margin: 0;
margin: 0;

The result appears in Figure 36.

Figure 36. The margin property can change or remove margins from elements.

The body element also, by default, has a small margin that creates a gap surrounding. This gap
can also be removed using the margin property.
While the margin property defines the gap between the element and its surroundings, the
padding property of the element defines the internal gap between the container’s limits and its
child elements. Consider the h2 and p elements inside each div in the sample code, for example.
We could use their margin property to create a gap to the borders of the corresponding div, but it
is simpler to change the padding property of the container:
#second {
background-color: #4e9a06ff;
padding: 1em;

Only the rule for the second div was modified, so the results (Figure 37) show the difference
between the second div and the other div containers.

Figure 37. Different div containers can have different paddings.

The margin property is a shorthand for four properties controlling the four sides of the box:
margin-top, margin-right, margin-bottom, and margin-left. When margin is assigned a
single value, as in the examples so far, all four margins of the box use it. When two values are
written, the first defines the top and bottom margins, while the second defines the right and left
margins. Using margin: 1em 2em, for example, defines a gap of 1 em for the top and bottom
margins and a gap of 2 em for the right and left margins. Writing four values sets the margins for
the four sides in a clockwise direction, beginning at the top. The different values in the shorthand
property are not required to use the same units.
The padding property is a shorthand as well, following the same principles as the margin
property.
In their default behaviour, block elements stretch to fit the available width. But this is not
mandatory. The width property can set a fixed horizontal size to the box:
width: 6em;

The addition of width: 6em to the CSS rule shrinks the first div horizontally, leaving a blank
space to its right side (Figure 38).

Figure 38. The width property changes the horizontal width of the first div.

Instead of leaving the first div aligned to the left, we may want to center it. Centering a box is
equivalent to setting margins of the same size on both sides, so we can use the margin property to
center it. The size of the available space may vary, so we use the auto value to the left and right
margins:
width: 6em;
margin: 0 auto;

The left and right margins are automatically computed by the browser and the box will be
centered (Figure 39).

Figure 39. The margin property is used to center the first div.

As shown, making a block element narrower does not make the remaining space available to the
next element. The natural flow is still preserved, as if the narrower element still occupies all the
available width.

Customizing Normal Flow
Normal flow is simple and sequential. CSS also lets you break normal flow and position elements
in very specific ways, even overriding the scrolling of the page if you want. We’ll look at several
ways to control the positioning of elements in this section.

Floating Elements
It is possible to make sibling block elements share the same horizontal space. One way to do so is
through the float property, which removes the element from the normal flow. As its name
suggests, the float property makes the box float over the block elements coming after, so they
will be rendered as if they were under the floated box. To make the first div float to the right, add
float: right to the corresponding CSS rule:
width: 6em;
float: right;

The automatic margins are ignored in a floated box, so the margin property can be removed.
Figure 40 shows the result of the floating the first div to the right.

Figure 40. The first div is floating and is not part of the normal flow.

By default, all block elements coming after the floated element will go under it. Therefore, given
enough height, the floated box will cover all remaining block elements.
Although a floating element goes above other block elements, the inline contents inside the
floating element’s container wrap around the floating element. The inspiration for this comes

from magazine and newspaper layouts, which often wrap text around an image, for example.
The previous image shows how the first div covers the second div and part of the third div.
Assume we want the first div to float over the second div, but not the third. The solution is to
include the clear property in the CSS rule corresponding to the third div:
#third {
background-color: #5c3566da;
clear: right;

Setting the clear property to right makes the corresponding element skip any previous
elements floated to the right, resuming normal flow (Figure 41).

Figure 41. The clear property returns to normal flow.

Likewise, if a previous element floated to the left, you can use clear: left to resume normal
flow. When you have to skip floated elements on both the left and the right, use clear: both.

Positioning Boxes
In normal flow, each box goes after the boxes coming before it in the document tree. The previous
sibling elements “push” the elements coming after them, moving them to the right and
downwards inside their parent element. The parent element may have its own siblings doing the
same thing to it. It is like placing tiles side by side in a wall, beginning at the top.
This method of positioning the boxes is called static, and is the default value for the CSS position
property. Other than defining margins and padding, there is no way to reposition a static box in
the page.
Like the tiles in the wall analogy, static placement is not mandatory. As with tiles, you can place
the boxes anywhere you want, even covering other boxes. To do so, assign the position property
to one of the following values:

relative
The element follows the normal flow of the document, but it can use the top, right, bottom,
and left properties to set offsets relative to its original static position. The offsets can also be
negative. The other elements remain in their original places, as if the relative element is still
static.
absolute
The element ignores the normal flow of the other elements and positions itself on the page by
the top, right, bottom, and left properties. Their values are relative to the document’s body
or to a non-static parent container.
fixed
The element ignores the normal flow of the other elements and positions itself by the top,
right, bottom, and left properties. Their values are relative to the viewport (i.e., the screen
area where the document is shown). Fixed elements do not move as the visitor scrolls through
the document, but resemble a sticker fixed on the screen.
sticky
The element follows the normal flow of the document. However, instead of going off the
viewport when the document scrolls, it will stop at the position set by the top, right, bottom,
and left properties. If the top value is 10px, for example, the element will stop scrolling
under the top part of the viewport when it reaches 10 pixels from the top limit of the viewport.
When that happens, the rest of the page continues to scroll, but the sticky element behaves like
a fixed element in that position. It will go back to its original position when the document scroll
back to its position in the viewport. Sticky elements are commonly used nowadays to create top
menus that always be visible.
Positions that can use the top, right, bottom, and left properties are not required to use them
all. If you set both the top and height properties of an absolute element, for example, the
browser implicitly calculates its bottom property (top + height = bottom).

The display Property
If the order given by the normal flow is not an issue in your design, but you want to change how
the boxes align themselves in the page, modify the display property of the element. The display
property can even make the element completely disappear from the rendered document, by
setting display: none. This is useful when you want to show the element later using JavaScript.
The display property can also, for example, make a block element behave like an inline element
(display: inline). Doing so is not considered good practice, though. Better methods exist to
place container elements side by side, such as the flexbox model.

The flexbox model was invented to overcome the limitations of floats and to eliminate the
inappropriate use of tables to structure the page layout. When you set the display property of a
container element to flex to turn it into a flexbox container, its immediate children will behave
more or less like cells in a table row.

If you want even more control over the placement of the elements on the page, take a
look at the CSS grid feature. The grid is a powerful system based on rows and columns
to create elaborate layouts.

To test the flex display, add a new div element to the example page and make it the container for
the three existing div elements:
<div id="container">
<div id="first">
<h2>First div</h2>
<p><span>Sed</span> <span>eget</span> <span>velit</span>
<span>id</span> <span>ante</span> <span>tempus</span>
<span>porta</span> <span>pulvinar</span> <span>et</span>
<span>ex.</span></p>
</div><!-- #first -->
<div id="second">
<h2>Second div</h2>
<p><span>Fusce</span> <span>vitae</span> <span>vehicula</span>
<span>neque.</span> <span>Etiam</span> <span>maximus</span>
<span>vulputate</span> <span>neque</span> <span>eu</span>
<span>lobortis.</span> <span>Phasellus</span> <span>condimentum,</span>
<span>felis</span> <span>eget</span> <span>eleifend</span>
<span>aliquam,</span> <span>dui</span> <span>dolor</span>
<span>bibendum</span> <span>leo.</span></p>
</div><!-- #second -->
<div id="third">
<h2>Third div</h2>
<p><span>Pellentesque</span> <span>ornare</span> <span>ultricies</span>
<span>elementum.</span> <span>Morbi</span> <span>vulputate</span>
<span>pretium</span> <span>arcu,</span> <span>sed</span>
<span>faucibus.</span></p>
</div><!-- #third -->

</div><!-- #container -->

Add the following CSS rule to the stylesheet to turn the container div into a flexbox container:
#container {
display: flex;

The result is the three inner div elements rendered side by side (Figure 42).

Figure 42. The flexbox model creates a grid.

Using the value inline-flex instead of flex has basically the same result, but makes the
children behave more like inline elements.

Responsive Design
We know that CSS provides properties that adjust the sizes of elements and fonts relative to the
available screen area. However, you may want to go further and use a different design for
different devices: for example, desktop systems versus devices with screens dimensions under a
certain size. This approach is called responsive web design, and CSS provides methods called media
queries to make it possible.
In the previous example, we modified the page layout to place the div elements side by side in
columns. That layout is suitable for larger screens, but it will be too cluttered in smaller screens.
To solve this problem, we can add a media query to the stylesheet matching only screens with at
least 600px in width:
@media (min-width: 600px){
#container {
display: flex;

The CSS rules inside the @media directive will be used only if the criteria in parenthesis is
satisfied. In this example, if the viewport width is less than 600px, the rule will not be applied to
the container div and its children will be rendered as conventional div elements. The browser reevaluates the media queries every time the viewport dimension changes, so the layout can be
changed in real time while resizing the browser window or rotating the smartphone.

## 1. If the position property is not modified, what positioning method will be used by the
browser?

## 2. How can you make sure an element’s box will be rendered after any previously floated
elements?

## 3. How can you use the margin shorthand property to set the top/bottom margins to 4px and the
right/left margins to 6em?

4. How can you horizontally center a static container element with fixed width on the page?

## 1. Write a CSS rule matching the element <div class="picture"> so the text inside its
following block elements settles toward its right side.

2. How does the top property affect a static element relative to its parent element?

## 3. How does changing the display property of an element to flex affect its placement in the
normal flow?

## 4. What CSS feature allows you to use a separate set of rules depending on the dimensions of the
screen?

This lesson covers the CSS box model and how we can customize it. In addition to the normal flow
of the document, the designer can make use of different positioning mechanisms to implement a
custom layout. The lesson goes through the following concepts and procedures:
- The normal flow of the document.
- Adjustments to the margin and padding of an element’s box.
- Using the float and clear properties.
- Positioning mechanisms: static, relative, absolute, fixed and sticky.
- Alternative values for the display property.
- Responsive design basics.

## 1. If the position property is not modified, what positioning method will be used by the
browser?
The static method.
2. How can you make sure an element’s box will be rendered after any previously floated
elements?
The clear property of the element should be set to both.
3. How can you use the margin shorthand property to set the top/bottom margins to 4px and the
right/left margins to 6em?
It can be either margin: 4px 6em or margin: 4px 6em 4px 6em.
4. How can you horizontally center a static container element with fixed width on the page?
Using the auto value in its margin-left and margin-right properties.

## 1. Write a CSS rule matching the element <div class="picture"> so the text inside its
following block elements settles toward its right side.
.picture { float: left; }
2. How does the top property affect a static element relative to its parent element?
The top property does not apply to static elements.
3. How does changing the display property of an element to flex affect its placement in the
normal flow?
The placement of the element itself does not change, but its immediate child elements will be
rendered side by side horizontally.
4. What CSS feature allows you to use a separate set of rules depending on the dimensions of the
screen?
Media queries allow the browser to verify the viewport dimensions before applying a CSS rule.

Web Development Essentials (030) (Version 1.0) |

## Topic 034: JavaScript Programming

### 034.1 JavaScript Execution and Syntax
Web Development Essentials version 1.0, Exam 030, Objective 034.1
- Run JavaScript within an HTML document
- Understand the JavaScript syntax
- Add comments to JavaScript code
- Access the JavaScript console
- Write to the JavaScript console
- <script>, including the type (`text/javascript) and src attributes
- ;
- //, /* */
- console.log

### 034.1 Lesson 1

### 034.1 JavaScript Execution and Syntax

Web pages are developed using three standard technologies: HTML, CSS, and JavaScript.
JavaScript is a programming language that lets the browser dynamically update website content.
The JavaScript is usually executed by the same browser used to view a webpage. This means that,
similar to CSS and HTML, the exact behavior of any code you write might differ between
browsers. But most common browsers adhere to the ECMAScript specification. This is a standard
that unifies JavaScript usage in the web, and will be the basis for the lesson, together with the
HTML5 specification, which specifies how JavaScript needs to be put into a webpage for a browser
to execute it.

Running JavaScript in the Browser
To execute JavaScript, the browser needs to obtain the code either directly, as part of the HTML
that makes up the web page, or as a URL that indicates a location for a script to be executed.
The following example shows how to include code directly in the HTML file:

<h1>Website Headline</h1>
<p>Content</p>
console.log('test');

The code is wrapped between <script> and </script> tags. Everything included in these tags
will be executed by the browser directly when loading the page.
The position of the <script> element within the page dictates when it will be executed. An HTML
document is parsed from top to bottom, with the browser deciding when to display elements on
the screen. In the example just shown, the <h1> and <p> tags of the website are parsed, and likely
displayed, before the script runs. If the JavaScript code within the <script> tag would take very
long to execute, the page would still display without any problem. If, however, the script had been
placed above the other tags, the web page visitor would have to wait until the script finishes
executing before seeing the page. For this reason, <script> tags are usually placed in one of two
places:
- At the very end of the HTML body, so that the script is the last thing that gets executed. Do this
when the code adds something to the page that would not be useful without the content. An
example would be adding functionality to a button, as the button has to exist for the
functionality to make sense.
- Inside the <head> element of the HTML. This ensures that the script is executed before the
HTML body is parsed. If you want to change the loading behavior of the page, or have
something that needs to be executed while the page is still not fully loaded, you can put the
script here. Also, if you have multiple scripts that depend on a particular script, you can put
that shared script in the head to make sure it’s executed before other scripts.
For a variety of reasons, including manageability, it is useful to put your JavaScript code into
separate files that exist outside of your HTML code. External JavaScript files are included using a
<script> tag with a src attribute, as follows:

<script src="/button-interaction.js"></script>

The src tag tells the browser the location of the source, meaning the file containing the JavaScript
code. The location can be a file on the same server, as in the example above, or any web-accessible
URL such as https://www.lpi.org/example.js. The value of the src attribute follows the
same convention as the import of CSS or image files, in that it can be relative or absolute. Upon
encountering a script tag with the src attribute, the browser will then attempt to obtain the
source file by using an HTTP GET request, so external files need to be accessible.
When you use the src attribute, any code or text that is placed between the <script>…
</script> tags is ignored, according to the HTML specification.
<script src="/button-interaction.js">
console.log("test"); // <-- This is ignored

There are other attributes you can add to the script tag to further specify how the browser
should get the files, and how it should handle them afterwards. The following list goes into detail
about the more important attributes:
async
Can be used on script tags and instructs the browser to fetching the script in the background,
so as not to block the page load process. The page load will still be interrupted while after the
browser obtains the script, because the browser has to parse it, which is done immediately
once the script has been fetched completely. This attribute is Boolean, so writing the tag like
<script async src="/script.js"></script> is sufficient and no value has to be
provided.
defer
Similar to async, this instructs the browser not to block the page load process while fetching
the script. Rather than that, the browser will defer parsing the script. The browser will wait

until the entire HTML document has been parsed and only then it will parse the script, before
announcing that the document has been to be completely loaded. Like async, defer is a
Boolean attribute and is used in the same way. Since defer implies async, it is not useful to
specify both tags together.

When a page is completely parsed, the browser indicates that it is ready to
display by triggering a DOMContentLoaded event, when the visitor will be able
to see the document. Thus, the JavaScript included in a <head> event always has
a chance to act on the page before it is displayed, even if you include the defer
attribute.

type
Denotes what type of script the browser should expect within the tag. The default is JavaScript
(type="application/javascript"), so this attribute isn’t necessary when including
JavaScript code or pointing to a JavaScript resource with the src tag. Generally, all MIME types
can be specified, but only scripts that are denoted as JavaScript will be executed by the
browser. There are two realistic use cases for this attribute: telling the browser not to execute
the script by setting type to an arbitrary value like template or other, or telling the browser
that the script is an ES6 module. We don’t cover ES6 modules in this lesson.

When multiple scripts have the async attribute, they will be executed in the
order they finish downloading, not in the order of the script tags in the
document. The defer attribute, on the other hand, maintains the order of the
script tags.

Browser Console
While usually executed as part of a website, there is another way of executing JavaScript: through
the browser console. All modern desktop browsers provide a menu through which you can
execute JavaScript code in the browser’s JavaScript engine. This is usually done for testing new
code or to debug existing websites.
There are multiple ways to access the browser console, depending on the browser. The easiest
way is through keyboard shortcuts. The following are the keyboard shorcuts for some of the
browsers currently in use:
Chrome
Ctrl + Shift + J ( Cmd + Option + J on Mac)

Firefox
Ctrl + Shift + K ( Cmd + Option + K on Mac)

Safari
Ctrl + Shift + ? ( Cmd + Option + ? on Mac)

You can also right-click on a webpage and select the “Inspect” or “Inspect Element” option to open
the inspector, which is another browser tool. When the inspector opens, a new panel will appear.
In this panel, you can select the “Console” tab, which will bring up the browser console.
Once you pull up the console, you can execute JavaScript on the page by typing the JavaScript
directly into the input field. The result of any executed code will be shown in a separate line.

JavaScript Statements
Now that we know how to start executing a script, we will cover the basics of how a script is
actually executed. A JavaScript script is a collection of statements and blocks. An example
statement is console.log('test'). This instruction tells the browser to output the word test to
the browser console.
Every statement in JavaScript is terminated by a semicolon (;). This tells the browser that the
statement is done and a new one can be started. Consider the following script:
var message = "test"; console.log(message);

We have written two statements. Every statement is terminated either by a semicolon or by the
end of the script. For readability purposes, we can put the statements on separate lines. This way,
the script could also be written as:
var message = "test";
console.log(message);

This is possible because all whitespace between statements, such as a space, a newline, or a tab, is
ignored. Whitespace can also often be put between individual keywords within statements, but
this will be further explained in an upcoming lesson. Statements can also be empty, or comprised
only of whitespace.
If a statement is invalid because it has not been terminated by a semicolon, ECMAScript makes an
attempt to automatically insert the proper semicolons, based on a complex set of rules. The most
important rule is: If an invalid statement is composed of two valid statements separated by a
newline, insert a semicolon at the newline. For instance, the following code does not form a valid
statement:

console.log("hello")
console.log("world")

But a modern browser will automatically execute it as if it were written with the proper
semicolons:

Thus, it is possible to omit semicolons in certain cases. However, as the rules for automatic
semicolon insertion are complex, we advise you always to properly terminate your statements to
avoid unwanted errors.

JavaScript Commenting
Big scripts can get quite complicated. You might want to comment on what you are writing, to
make the script easier to read for other people, or for yourself in the future. Alternatively, you
might want to include meta information in the script, such as copyright information, or
information about when the script was written and why.
To make it possible to include such meta information, JavaScript supports comments. A developer
can include special characters in a script that denote certain parts of it as a comment, which will
be skipped on execution. The following is a heavily commented version of the script we saw
earlier.
/*
This script was written by the author of this lesson in May, 2020.
It has exactly the same effect as the previous script, but includes comments.
*/
// First, we define a message.
var message = "test";
console.log(message); // Then, we output the message to the console.

Comments are not statements and do not need to be terminated by a semicolon. Instead, they
follow their own rules for termination, depending on the way the comment is written. There are
two ways to write comments in JavaScript:

Multi-line comment
Use /* and */ to signal the start and end of a multi-line comment. Everything after /*, until the
first occurrence of */ is ignored. This kind of comment is generally used to span multiple lines,
but it can also be used for single lines, or even within a line, like so:
console.log(/* what we want to log: */ "hello world")

Because the goal of comments is generally to increase the readability of a script, you should
avoid using this comment style within a line.
Single-line comment
Use // (two forward slashes) to comment out a line. Everything after the double-slash on the
same line is ignored. In the example shown earlier, this pattern is first used to comment an
entire line. After the console.log(message); statement, it is used to write a comment on the
rest of the line.
In general, single-line comments should be used for single lines, and multi-line comments for
multiple lines, even if it possible to use them in other ways. Comments within a statement should
be avoided.
Comments can also be used to temporarily remove lines of actual code, as follows:
// We temporarily want to use a different message
// var message = "test";
var message = "something else";

1. Create a variable called ColorName and assign the value RED to it.

## 2. Which of the following scripts are valid?
console.log("hello")
// console.log("hello")
console.log("world") //;
console.log("hello"); /*
console.log("world") */

1. How many JavaScript statements can be written on a single line without using a semicolon?

2. Create two variables named x and y, then print their sum to the console.

In this lesson we learned different ways of executing JavaScript, and how to modify the script
loading behavior. We also learned the basic concepts of script composition and commenting, and
have learned to use the console.log() command.
HTML used in this lesson:
The script tag can be used to include JavaScript directly or by specifying a file with the src
attribute. Modify how the script is loaded with the async and defer attributes.
JavaScript concepts introduced in this lesson:
;
A semicolon is used to separate statements. Semicolons can sometimes — but should not
be — ommitted.
//, /*…*/
Commenting can be used to add comments or meta information to a script file, or to prevent
statements from being executed.
console.log("text")
The console.log() command can be used to output text to the browser console.

1. Create a variable called ColorName and assign the value RED to it.
var ColorName = "RED";
