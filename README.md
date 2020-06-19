# Native Android & iOS app prototype<br>for the ProCon.IP pool controller

This was just an experiment! I was interested in building a small app with NativeScript, 
which is some kind of TypeScript that comes with an own transpiler and a special xml
based templating language, which can then be used to build **native Android and iOS apps**.


## What is this app for?

The app is a simple remote control with support for basic features of the ProCon.IP,
which is a low budget fully automated web-based swimming pool control unit. The features
offered by the app are:
* electrode measurements (redox and pH) as gauge view
* canister level as gauge view
* temperatures in a simple list view
* switching relays (there is a bug, when the external relays / relay extension is active


## Official download?

There is no download yet. I have not published the app, because of the really small target
group and the relatively high costs for publishing apps on the respectively device native
app marketplace. To be honest: The most expensive factor would be a release for Apple
devices. But I am using iOS/iPadOS devices and so it would not make too much sense for me
to release and maintain an app, that I am not even using myself...

Maybe I will try to add build/release automation with Travis CI once I made this repo
public. But that's no promise, just a _maybe_!


## Demo video

I made a demo video showing the app in a real world example. It might be the best way
to get an impression of it.

https://youtu.be/4W85BKInJrs


## Reuse of the code

As the project ended in the decision that I am not willing to pay to build an easy to update
mobile device native app, I started my next project: An ioBroker adapter based on the core
code, that abstracts the APIs of the pool controller. This more general approach is available
and distributable for free and can be used to build custom mobile device compatible web apps
and to integrate with further smart home stuff, such as voice assistants.

Want to read more about this follow up project? See: https://github.com/ylabonte/ioBroker.procon-ip


# License

See: [LICENSE.md](./LICENSE.md)
