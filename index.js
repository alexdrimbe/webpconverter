const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const colors = require('colors')

const inputDir = `${__dirname}/input`
const outputDir = `${__dirname}/output`

colors.setTheme({
	info: 'green',
	error: 'red',
})

const files = path.join(inputDir, '/**/*.+(png|jpg|jpeg)')

const convertFile = (inputFile) => {
	const fileParse = path.parse(inputFile)
	const fileDir = fileParse?.dir?.replace(inputDir, outputDir)
	const fileName = `${fileParse?.name}.webp`
	const outputFile = path.join(fileDir, fileName)

	if (!fs.existsSync(fileDir)) {
		fs.mkdirSync(fileDir, { recursive: true })
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
