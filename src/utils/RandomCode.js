import crypto from "crypto";

export default function RandomCode() {
    return crypto.randomInt(100000, 1000000).toString();
}
