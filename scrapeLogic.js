const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
    
    const browser = await puppeteer.launch({
        args: [
            "--disable-setupid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });
    try{
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
        await page.goto('http://americanas.com.br/');

        // Set screen size
        await page.setViewport({width: 1080, height: 1024});

        // Type into search box
        const title = await page.title();

        // Wait and click on first result
        /*const searchResultSelector = '.search-box__link';
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);*/

        // Locate the full title with a unique string
        /*const textSelector = await page.waitForSelector(
            'text/Customize and automate'
        );
        const fullTitle = await textSelector?.evaluate(el => el.textContent);*/

        // Print the full title
        console.log('The title of this blog post is "%s".', title);
        res.send(title);
        
    }catch (e){
        console.error(e);
        res.send(`Error puppeteer: ${e}`);
    }finally{
        await browser.close();
    }
};

module.exports = { scrapeLogic };