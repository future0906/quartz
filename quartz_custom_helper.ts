import { endsWith } from "./quartz/util/path";
import { QuartzPluginData } from "./quartz/plugins/vfile"
// path helpers
export function isFolderPath(fplike: string): boolean {
    return (
      fplike.endsWith("/") ||
      endsWith(fplike, "index") ||
      endsWith(fplike, "index.md") ||
      endsWith(fplike, "index.html")
    )
}

export function commonFilter(f:QuartzPluginData)
{
  return !isFolderPath(f.slug as string) && !f.frontmatter?.noindex
}
  