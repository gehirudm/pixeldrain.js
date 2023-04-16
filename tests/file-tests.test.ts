import { PixelDrain } from "../src"
import { PixeldrainAPIError } from "../src/pixeldrain.js/components/errors/pixeldrainapierror";
import { PixeldrainFile } from "../src/pixeldrain.js/components/file/file"

const TEST_FILE_ID = "8ZQq855y"
let uploadedTestFiles: PixeldrainFile[] = [];

describe("Testing File functions", () => {

    afterAll(async () => {
        uploadedTestFiles.forEach(async (file) => {
            await file.delete();
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

        test("File Upload testing", async () => {
            let file = await client.uploadFile({
                path: "./resources/test-text.txt",
                name: "test-file",
                anonymous: false,
            })
            uploadedTestFiles.push(file);

            let sameFile = await client.getFile(file.id)

            expect(sameFile.name).toBe("test-file")
            expect(sameFile.can_edit).toBeTruthy()
        })

        test("Anonymous File Upload testing", async () => {
            let file = await client.uploadFile({
                path: "./resources/test-text.txt",
                name: "test-file",
                anonymous: true,
            })

            uploadedTestFiles.push(file);

            let sameFile = await client.getFile(file.id)

            expect(sameFile.name).toBe("test-file")
            expect(sameFile.can_edit).toBeFalsy()
        })

        test("Anonymous File deletion testing", async () => {
            expect(async () => {
                let file = await client.uploadFile({
                    path: "./resources/test-text.txt",
                    name: "test-file",
                    anonymous: true,
                })

                uploadedTestFiles.push(file);

                file.delete()

            }).toThrow(PixeldrainAPIError)
        })
    })
})