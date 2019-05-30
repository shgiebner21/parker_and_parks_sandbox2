# parker_and_parks


###Database is Firebase by Google and is accessed via shgiebner21@gmail account.
###Parks data and Badges data is maintained in json files in the main parker and parks repo.
###When necessary to update data for the app, we can go into Firebase and import updated json files from the repo.


## To run on simulator;
### react-native run-ios
### react-native run-android


## A mobile application created using react-native init
## This is the Android version of the application

### This application is for people to build memories around Charleston's Parks.  


## Open items;

### 1) Whne entering a new family, it would not accept the "Done" button click.  Kept giving me "required data missing."


### Completed items;

### 1) Android app for some reason is not adding childID to FIRST child created, but is adding for second child.
   ### 1a) Just tried it again and was unable to recreate

   ### 2) If data is entered in e-mail field in Login, then Back is clicked to go to Signin (Login to Signon), the e-mail data is still there...need to reset State on Back.
   ### 2a) I'm going to leave this, I don't mind it that much.