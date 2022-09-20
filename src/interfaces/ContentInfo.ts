export interface ContentInfo {
  etag: string;
  items: ContentItem[];
  kind: string;
  pageInfo: ContentPageInfo;
}

export interface ContentItem {
  etag: string;
  id: ContentId;
  kind: string;
  snippet: ContentSnippet;
  wishListExistYn: boolean;
}

interface ContentId {
  kind: string;
  videoId: string;
}

interface ContentSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: ContentThumbnails
  title: string;
}

interface ContentThumbnails {
  default: ContentThumbnailsElement
  high: ContentThumbnailsElement
  medium: ContentThumbnailsElement
}

interface ContentThumbnailsElement { 
  url: string;
  width: number;
  height: number;
}

interface ContentPageInfo {
  resultsPerPage: number;
  totalResults: number;
}

export function loadContentInfo(data: any): ContentInfo {
  return {
    etag: data.etag,
    items: data.items ? data.items.map(mapContentItems) : [],
    kind: data.kind,
    pageInfo: data.pageInfo
  }
}

function mapContentItems(data: any) {
  return {
    etag: data.etag,
    kind: data.kind,
    id: data.id,
    snippet: data.snippet
  };
}
  