import sharp from "sharp";
import fs from "fs";

export async function sharpOptimize (req, res, next) {
    try {
        const inputPath = req.file.path; 
        // path = le chemin complet du fichier sur ton serveur
        const baseName = req.file.filename.split('.')[0];

        const webpOutput = `images/${baseName}_optimized.webp`;

        // Vérifier que Sharp peut lire le fichier
        await sharp(inputPath).toBuffer();

        // WEBP optimisé
        await sharp(inputPath)
        .resize({ width: 500 })
        .webp({quality: 60, mozjpeg: true})
        .toFile(webpOutput);

        // Supprimer l'image originale
        fs.unlinkSync(inputPath);

        // On choisit le format webp pour MongoDB
        req.file.filename = `${baseName}_optimized.webp`;

        next(); // On passe au controller createBook et modifyBook

    } catch (error) {
        console.error("Erreur Sharp :", error);
        res.status(500).json({ error });
    }
}