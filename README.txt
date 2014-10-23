ACU
===

This will be the home of a widget to create "in page" modals simulating alert() or confirm() windows. So it's really two widgets, packaged into one.

There are pros and cons to doing this! Be sure you read the README and understand the Impact of such a switch. Really. Your coding pattern must be modified to support these. If you still want to switch, continue with the Instructions.

This version of the alertConfirmUtil uses the Module Pattern in order to facilitate "private" properties and methods using closures.

Requirements:
======================
My original widget was based on the now retired YUI library (2.x).

I am now investigating which jQuery popup to use (why reinvent the wheel?)
http://jqueryui.com/dialog/
http://leanmodal.finelysliced.com.au/# //not used - not a true modal
http://labs.voronianski.com/jquery.avgrund.js/ //Rich feature set, including template

ALL above use declarative style. That is fine when used directly. However we want an Interpretive

https://github.com/VodkaBears/Remodal#readme
allows programmatic modal open, so you can update the modal just prior to opening it (not just assign click>open to <a> tags of existing - static - modal.


Most manageable API:
http://api.jqueryui.com/dialog/
allows initialize/get/set options, has buttons and many other options, events

http://dixso.github.io/custombox/
very nice effects, but no built in buttons


choice:
jqueryui


Coding Considerations:
======================
Alert and Confirms halt (like a Firebug break does) the JavaScript process until the user takes an action, clicking a button or closing/cancelling the window. This allows your code to be procedural, in that subsequent script can immediately follow the alert() or confirm(), and WILL NOT BE EXECUTED until that user action occurs.

However, a pseudopop panel WILL NOT HALT the JavaScript process. Unlike a standard alert() or confirm(), any lines following the launch of such a panel WILL BE EXECUTED without waiting for user action.

This means you cannot have any code in your method (or other block of script) following the pseudopop. It must be the last executed line in that method/block, so that the current active JavaScript thread concludes. This is less of an issue for the alert() replacement. The confirm() however is now trickier. YOu can no longer use a conditional to work with the value returned by the confirm(). The JS process has ended. So instead, our user actions will trigger callback methods, similar to how AJAX works. By making the pseudopop modal, we can force the user to take an action on our false confirm() before proceeding. Obviously if we have some other JS processes with callbacks waiting and they fire, those processes will continue. That could be another consideration.


Instructions:
======================
Coming soon, with the widget.

acu has two public methods, alert() and confirm(). There are 3 ways to use acu:

1 acu.alert("This is my message");
2 acu.alert([config object]);
3 acu.confirm([config object]);

config object examples:
--------------
"A string literal"
{"result":"Error", "msg":"An error occurred. Please try again later"}
{"result":"Warning", "msg":"Action denied, aborted."}
{"result":"Success", "msg":"Your action was successfully completed."}
{"result":"Confirm", "msg":"There are dependencies, are you sure you wish to continue?", yesHandler:myPageObject.confirmYes, noHandler:myPageObject.confirmNo}*

*Where myPageObject.confirmYes and myPageObject.confirmNo are predeclared methods in your page code. If you omit these config params for a "result":"Confirm", the confirm buttons will appear but do nothing.



FAQ:
======================
Q: Why use this? WHy not just use that jQuery modal plugin directly?
A: Rather than duplicating the plugin config every place you invoke a custom alert, or confirm, Pseudopop handles all that for you, in a single definition. Easier to manage/update, and your invoke instances are much simpler, more convenient to use.

Q: Can I override alert()? 
A: Yes, you can choose to override both alert() and confirm() if you wish to. Personally I prefer not to. But if you do, it also allows you to rename those standard features - keeps them available still for testing and debugging.

