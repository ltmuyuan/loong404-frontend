import {base64Decode} from "@/utils";
import Jimp from "jimp";
import QRCode, {toBuffer} from "qrcode";

export async function POST(request: Request, response: Response) {
  const {res} = await request.json();
  console.log(base64Decode(res));
  try {
    const rootPath = process.cwd();
    // 加载底图
    const image = await Jimp.read(rootPath + "/src/asset/image/raw.png");

    // 加载字体

    const font = await Jimp.loadFont(rootPath + '/src/asset/font/PingFang_24_BLACK.fnt');
    // 添加文字
    // 字体黑色转白色
    // measureText
    const textWidth = Jimp.measureText(font, base64Decode(res));
    const textHeight = Jimp.measureTextHeight(font, base64Decode(res), textWidth);
    // 生成字体图片
    const scale = 1.5;
    const fontImage = new Jimp(textWidth * scale, textHeight * scale);
    fontImage.print(font, 0, 0, base64Decode(res));
    // 放大字体图片
    fontImage.scale(scale, Jimp.RESIZE_BICUBIC);
    // 反转颜色
    fontImage.invert();
    // 插入图片
    image.composite(fontImage, (image.bitmap.width - textWidth * scale) / 2, 1043);

    const qrCodeData = 'https://wealth.anuniverse.com/';
    const qrCodeImage = await QRCode.toBuffer(qrCodeData);

    const qrImage = await Jimp.read(qrCodeImage);

    image.composite(qrImage, qrImage.bitmap.width+30, image.bitmap.height - qrImage.bitmap.height - 30);

    const encoded = await image.getBase64Async(Jimp.MIME_PNG);
    return new Response(encoded);
  } catch (error) {
    console.error('发生错误：', error);
  }
}
