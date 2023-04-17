import { PixelDrain } from "../src"
import { PixeldrainAPIError } from "../src/pixeldrain.js/components/errors/pixeldrainapierror";
import { PixeldrainFile } from "../src/pixeldrain.js/components/file/file"

const superchargedFs = require('@supercharge/fs');

const TEST_FILE_ID = "8ZQq855y"
let uploadedTestFiles: PixeldrainFile[] = [];

describe("Testing File functions", () => {

    afterAll(async () => {
        uploadedTestFiles.forEach(async (file) => {
            await file.delete().catch(e => { return })
        })
    })

    describe("Testing File information functions", () => {
        let client = new PixelDrain("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77")

        test("Get file information", async () => {
            let file = await client.getFile(TEST_FILE_ID);
            expect(file.name).toBe("test-text.txt");
        })
    })

    describe("Testing File upload funtions", () => {
        let client = new PixelDrain("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77")

        test("Private File Upload testing", async () => {
            let file = await client.uploadFile({
                path: "./tests/resources/test-text.txt",
                name: "private upload test",
                anonymous: false,
            })
            uploadedTestFiles.push(file);

            let sameFile = await client.getFile(file.id)

            expect(sameFile.name).toBe("test-text.txt")
            expect(sameFile.can_edit).toBeTruthy()
        })

        test("Anonymous File Upload testing", async () => {
            let file = await client.uploadFile({
                path: "./tests/resources/test-text.txt",
                name: "anonymous upload test",
                anonymous: true,
            })

            uploadedTestFiles.push(file);

            let sameFile = await client.getFile(file.id)

            expect(sameFile.name).toBe("test-text.txt")
            expect(sameFile.can_edit).toBeFalsy()
        })
    })

    describe("Testing File deletion functions", () => {
        let client = new PixelDrain("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77")

        test("Private file deletion testing", async () => {
            let file = await client.uploadFile({
                path: "./tests/resources/test-text.txt",
                name: "test-file",
                anonymous: false,
            })

            let id = file.id;

            let anotherClient = new PixelDrain();
            let sameFile = await anotherClient.getFile(id)

            await expect(sameFile.delete()).rejects.toBeInstanceOf(PixeldrainAPIError);
        })

        test("Anonymous File deletion testing", async () => {
            let file = await client.uploadFile({
                path: "./tests/resources/test-text.txt",
                name: "test-file",
                anonymous: true,
            })

            await expect(file.delete()).rejects.toBeInstanceOf(PixeldrainAPIError);
        })
    })

    describe("Testing File download functions", () => {
        let client = new PixelDrain("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77")

        beforeAll(async () => {
            if (await superchargedFs.exists("./tests/downloads/test-text.txt")) {
                await superchargedFs.remove("./tests/downloads/test-text.txt")
            }
        })

        test("Download file", async () => {
            client.getFile(TEST_FILE_ID).then(async file => {
                await file.download("./tests/downloads")
                await expect(superchargedFs.exists('./tests/downloads/test-text.txt')).resolves.toBeTruthy();
            })
        })
    })
})