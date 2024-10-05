export default function getAssetsSource(path: string) {
    return new URL(`../${path}`, import.meta.url).href;
}
// path参数为src目录下静态资源路径
