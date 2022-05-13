import {addComma} from "../common/utils/numeric-utils";

describe("[numeric-utils:콤마_추가]", () => {
    it("NULL is returned 0", () => expect(addComma(null)).toEqual("0"));
    it("Undefined is returned 0", () => expect(addComma(undefined)).toEqual("0"));
    it("100", () => expect(addComma(100)).toEqual("100"));
    it("1000", () => expect(addComma(1000)).toEqual("1,000"));
    it("10000", () => expect(addComma(10000)).toEqual("10,000"));
    it("100000", () => expect(addComma(100000)).toEqual("100,000"));
    it("1000000", () => expect(addComma(1000000)).toEqual("1,000,000"));
    it("10000000", () => expect(addComma(10000000)).toEqual("10,000,000"));
    it("100000000", () => expect(addComma(100000000)).toEqual("100,000,000"));
    it("1000000000", () => expect(addComma(1000000000)).toEqual("1,000,000,000"));
});
