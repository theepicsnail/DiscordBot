/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import {parse} from '../src/parse';

describe("parse", function() {
  it("should handle empty inputs", function() {
    expect(parse("")).toEqual([]);
    expect(parse("     ")).toEqual([]);
  });

  it("should handle simple inputs", function() {
    expect(parse("test")).toEqual(["test"]);
    expect(parse("test 12 --foo=bar")).toEqual(["test", "12", "--foo=bar"]);
  });

  it("should handle quotes", function() {
    expect(parse("test \"hello world\" test")).toEqual(["test", "hello world", "test"]);

    // Note that when the quotes show up inside a string they get deleted.
    // I don't know what
    //   !test something"12 34"
    // should do, so it does ["test", "something12 34"]
    expect(parse("test\"hello world\" test")).toEqual(["testhello world", "test"]);
    expect(parse("don't try this at home kids.")).toEqual(["dont try this at home kids."]);
  });

  it("should handle escapes", function() {
    // \a -> a
    expect(parse("\\a")).toEqual(["a"]);

    // \\ -> \
    expect(parse("\\\\")).toEqual(["\\"]);

    expect(parse("hello\\ world")).toEqual(["hello world"]);

    expect(parse("'can\\'t touch this'")).toEqual(["can't touch this"])
  });
  
  it("should handle unterminated strings", function() {
    expect(parse("\"Hello world")).toEqual(["Hello world"]);
  });
});
