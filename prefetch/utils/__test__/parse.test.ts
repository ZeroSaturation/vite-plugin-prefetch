import test from "node:test";
import { stringify, stringifyConfig } from "../parse";
import assert from "node:assert";

test("stringify config", () => {
    assert.strictEqual(stringifyConfig({ a: () => "b", b: 'b', c: 3 }), `{a:() => "b",b:"b",c:3}`);
})

test("stringify", () => {
  assert.strictEqual(stringify({ a: () => "b" }), `[{a:() => "b"}]`);
  assert.strictEqual(stringify([{ a: () => "b" }]), `[{a:() => "b"}]`);
});
