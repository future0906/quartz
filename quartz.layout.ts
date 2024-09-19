import { filter } from "d3"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { commonFilter } from "./quartz_custom_helper"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/future0906",
      "Home": "https://shaneyao.com",
      "Notes": "https://notes.shaneyao.com",
      "中文主页": "https://yaozhixiang.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.Search(),
    Component.Darkmode(),
    // Component.DesktopOnly(Component.Explorer({folderClickBehavior:"link", filterFn: (node) => node.name !== "tags" && node.name !== "notes"})),
    Component.RecentNotes({
      title: "Recent Notes",
      limit: 4,
      showTags: false,
      filter: (f) =>
        f.slug!.startsWith("notes/") && commonFilter(f),
      linkToMore: "notes/" as SimpleSlug,
    }),
    Component.RecentNotes({
      title: "Recent Posts",
      limit: 2,
      showTags: false,
      filter: (f) =>
        f.slug!.startsWith("posts/") && commonFilter(f),
      linkToMore: "posts/" as SimpleSlug,
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    // Component.DesktopOnly(Component.Explorer({folderClickBehavior:"link", filterFn: (node) => node.name !== "tags" && node.name !== "notes"})),
  ],
  right: [],
}
