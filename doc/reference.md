# Reference
## Draw image
```
class ImageDraw extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const filePath = path.join(__dirname, "sample-resource/slim-images/slim01.jpg");
    const imgSrc = nativeImage.createFromPath(filePath);
    const data = imgSrc.toDataURL();
    const size = imgSrc.getSize();
    const img = new Image();
    img.src = data;
    img.onload = () => {
      const ctx = this.canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size.width / 4, size.height / 4);
      ctx.fillRect(20, 20, 80, 140);
    };
  }

  render() {
    return (
      <canvas
        width={800}
        height={512}
        ref={(c) => { this.canvas = c; }}
      />
    );
  }
}
```
