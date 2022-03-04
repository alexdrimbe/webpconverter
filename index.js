const sharp = require('sharp')
const path = require('path')
const glob = require('glob')
const colors = require('colors')

const inputDir = './input'
const outputDir = './output'

colors.setTheme({
	info: 'green',
	error: 'red',
})

const files = path.join(__dirname, inputDir, '/**/*.+(png|jpg|jpeg)')

const convertFile = (inputFile) => {
	const fileName = `${path.parse(inputFile)?.name}.webp`
	const outputFile = path.join(__dirname, outputDir, fileName)

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
