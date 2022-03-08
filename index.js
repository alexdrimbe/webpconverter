const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const colors = require('colors')

const inputDir = path.normalize(`${__dirname}/input`)
const outputDir = path.normalize(`${__dirname}/output`)

colors.setTheme({
	info: 'green',
	error: 'red',
})

const files = path.join(inputDir, '/**/*.+(png|jpg|jpeg)')

const convertFile = (inputFile) => {
	const fileParse = path.parse(inputFile)
	const inputFileDir = path.normalize(fileParse?.dir)
	const outputFileDir = inputFileDir?.replace(inputDir, outputDir)
	const fileName = `${fileParse?.name}.webp`
	const outputFile = path.join(outputFileDir, fileName)

	if (!fs.existsSync(outputFileDir)) {
		fs.mkdirSync(outputFileDir, { recursive: true })
	}

	sharp(inputFile)
		.webp({ quality: 85 })
		.toFile(outputFile)
		.then((info) => {
			console.log(colors.info(outputFile, info?.size))
		})
		.catch((error) => {
			console.log(colors.error(inputFile, error))
		})
}

glob(files, {}, (er, files) => {
	files.forEach(convertFile)
})
