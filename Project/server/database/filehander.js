const fs = require('fs')
const path = require('path')
const currPath = __dirname

function convertToAbsolutePath (filePath) {
  return path.join(currPath, filePath)
}

function readFileData (filePath) {
  try {
    const absFilePath = convertToAbsolutePath(filePath)
    const fileData = fs.readFileSync(absFilePath, 'utf8')
    return fileData
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
}

// console.log(readFileData('./prismaclient.js')) // Should return the content of the file 'filehander.js'
console.log(readFileData('../contents/published/language_1/course_1/topic_1/abstraction_1/lesson_1.txt')) // Should return the content of the file 'filehander.js'

function writeFile (relativePath, content) {
  try {
    // Create any necessary directories
    const absFilePath = convertToAbsolutePath(relativePath)
    const dirPath = path.dirname(relativePath)
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`Directory '${dirPath}' created successfully.`)
    // Write content to the file
    fs.writeFileSync(absFilePath, content)
    console.log(`File '${relativePath}' created successfully.`)
  } catch (error) {
    console.error(`Error creating/writing file: ${error.message}`)
  }
}

// Example usage:
const relativePathToFile = '../contents/published/language_1/course_1/topic_1/abstraction_2/lesson_1.txt'
const fileContent = '// Your JavaScript code here\nconsole.log("Hello, world!");'
writeFile(relativePathToFile, fileContent)
