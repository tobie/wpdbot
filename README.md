wpdbot
======

This is an very minimal irc bot for the #webplatform channel on freenode. It's built on top of [Jerk](http://gf3.github.com/Jerk/), a bot library for node.js.

To summon it just type:

    ![COMMAND] [TARGET]

So for example:

    !faq joe

will print:

    Joe: FAQ can be found here: http://docs.webplatform.org/wiki/Site_FAQ.

Adding new commands is easy, just fork this project, modify `./commands.json` and make a pull request.