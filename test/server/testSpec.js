'use strict';

var analysis = require('../../server/controllers/analyzerController.js');
// import analyzerController from '../../server/controllers/analyzerController.js';

describe("The 'toEqual' matcher", function() {

    it("works for simple literals and variables", function() {
      var a = 12;
      expect(a).toEqual(1);
    });

    it("should work for objects", function() {
      var foo = {
        a: 12,
        b: 34
      };
      var bar = {
        a: 12,
        b: 34
      };
      expect(foo).toEqual(bar);
    });
  });

// it("The 'toMatch' matcher is for regular expressions", function() {
//     var message = "foo bar baz";

//     expect(message).toMatch(/bar/);
//     expect(message).toMatch("bar");
//     expect(message).not.toMatch(/quux/);
//   });
// it("The 'toBeDefined' matcher compares against `undefined`", function() {
//     var a = {
//       foo: "foo"
//     };

//     expect(a.foo).toBeDefined();
//     expect(a.bar).not.toBeDefined();
//   });

// describe("A spec using the fail function", function() {
//   var foo = function(x, callBack) {
//     if (x) {
//       callBack();
//     }
//   };

//   it("should not call the callBack", function() {
//     foo(false, function() {
//       fail("Callback has been called");
//     });
//   });
// });