
/// <reference types="jasmine" />

all("A data driven test is a suite with multiple specs",
    ['a', 'b', 'c'],
    (value: string) => {
        expect(value).not.toBe('d');
    }
);

all("A data driven test can have many arguments",
    [
        [1, 2, 3],
        [2, 4, 6]
    ],
    (a: number, b: number, c: number) => {
        expect(c - (a + b)).toBe(0);
    }
);

all("A data driven test can be asynchronous",
    [
        [3, 1],
        [5, 2]
    ],
    (a: number, b: number, done: () => void) => {
        setTimeout(() => {
            expect(a - b > 0).toBe(true);
            done();
        }, 50);
    }
);

xall("A data driven test can be pending",
    [1, 2, 3],
    (value: number) => {
        expect(value < 4).toBe(true);
    }
);

describe("A suite", () => {
    var a: number;

    beforeEach(() => {
        a = 5;
    });

    all("can contain data driven tests",
        [1, 2, 3],
        (b: number) => {
            expect(a - b > 0).toBe(true);
        }
    );
});

using("Using instead of all when you would like to have the equivalent of multiple define statements",
    ['a', 'b', 'c'],
    (value: string) =>{
        let forbiddenValue;
        //with 'using' we can have beforeEach blocks
        beforeEach(() =>{
            forbiddenValue = 'd';
        });

        it("should not be forbiddenValue", () =>{
            expect(value).not.toBe(forbiddenValue);
        });
    }
);

xusing("disable tests",
    ['a', 'b', 'c'],
    (value: string) =>{
        it("the test should fail but it is disabled", () =>{
            expect(false).toBeTruthy();
        });
    }
);

using("level 1",
    ['a', 'b'],
    (level1: string) =>{
        const catesianProduct: string[] = ['a1', 'a2', 'b1', 'b2'];

        using("level 2",
            [1, 2],
            (level2: number) =>{
                const val = `${level1}${level2}`;

                it(" should combine level1 and level2", () =>{
                    expect(catesianProduct).toContain(val);
                });
            });
});