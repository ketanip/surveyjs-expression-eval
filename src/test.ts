import { test } from 'tap';
import evaluate from "./index";

const defaultContext = {
    haveKids: "yes",
    "have-kids": "yes",
    kidCount: 2,
    person: { name: "betsy" },
    items: ["shirt", "pants", "chapstick"],
    favoriteItem: "chapstick",
    phone: "123-456-7890",
    nullValue: undefined,
    birthdate: 22
}

const tests = [
    { expr: `{haveKids}='yes'`, expect: true },
    { expr: `{var('have-kids')}='yes'`, expect: true },
    { expr: `{var('have-kids').length} = 3`, expect: true },
    { expr: `{haveKids}='yes' and {kidCount} >= 1`, expect: true },
    { expr: `iif(age({birthdate}) >= 21, 'Adult', 'Minor')`, expect: 'Adult' },
    { expr: `{person.name}='betsy'`, expect: true },
    { expr: `{items} notempty`, expect: true },
    { expr: `{items} contains {favoriteItem}`, expect: true },
    { expr: `{items.length} > 1`, expect: true },
    {
        expr: `{email} notempty or {phone} notempty or {skype} notempty`,
        expect: true
    },
    {
        expr: `countCarApparel({email} notempty or {phone} notempty or {skype} notempty)`,
        expect: true,
        functions: {
            countCarApparel: (items: any) =>
            {return items}
                // items.filter((item: any) => clothes.includes(item)).length
        }
    },
    { expr: `['a', 'c'] anyof ['a', 'b']`, expect: true },
    { expr: `['a', 'b'] anyof ['a', 'b']`, expect: true },
    { expr: `['c', 'd'] anyof ['a', 'b']`, expect: false },

    { expr: `['a', 'c'] allof ['a', 'b']`, expect: false },
    { expr: `['a', 'b', 'c'] allof ['a', 'b']`, expect: true },
    { expr: `['c', 'd'] allof ['a', 'b']`, expect: false },
    { expr: `{nullValue} anyof ['a']`, expect: false },
    { expr: `{nullValue} anyof []`, expect: true }
]

for (const { expr, expect, functions }
    of tests) {
    test(expr, (t: any) => {
        const resp = evaluate(expr, defaultContext, functions);
        console.log(resp)
        t.equal(resp, expect);
        t.end();
    })
}


console.log("\n\n\n\nEVALUATION")
console.log(evaluate(tests[4].expr, defaultContext, []))