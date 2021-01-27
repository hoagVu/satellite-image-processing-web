import { spawn } from 'child_process';
import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
function insertLink(title, url) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink('Do the Tutorial', 'https://www.meteor.com/tutorials/react/creating-an-app');

    insertLink('Follow the Guide', 'http://guide.meteor.com');

    insertLink('Read the Docs', 'https://docs.meteor.com');

    insertLink('Discussions', 'https://forums.meteor.com');
  }
});

if (Meteor.isServer) {

  Meteor.methods({

    method1: function (arg) {
      return 123456;
    },

    method2: function (arg) {
      return new Promise((resolve, reject) => {
        let a = 0
        const process = spawn('python', ['assets/app/test.py', arg]);

        process.stdout.on(
          'data',
          data => {
            resolve(data.toString())
          }
        );
        process.stdout.on(
          'error',
          error => {
            reject(error)
          }
        );
      })
    },
  });
}
