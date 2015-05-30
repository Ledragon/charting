declare module reddit {
	export interface redditObject{
		kind: string;
		data: redditData;
	}
	export interface redditData{
		modash: string;
		children: Array<redditChild>;
		after: string;
		before: string;
	}	
	export interface redditChild{
		kind: string;
		data: redditChildData;
	}	
	
	export interface redditChildData {
		domain: string;
		banned_by: any;
		media_embed: any;
		subreddit: string;
		selftext_html: any;
		selftext: string;
		likes: any;
		suggested_sort: any;
		user_reports: Array<any>;
		secure_media: any;
		link_flair_text: any;
		id: any;
		gilded: any;
		archived: any;
		clicked: any;
		report_reasons: any;
		author: string;
		media: any;
		score: number;
		approved_by: any;
		over_18: boolean;
		hidden: boolean;
		thumbnail: string;
		subreddit_id: string;
		edited: any;
		link_flair_css_class: any;
		author_flair_css_class: any;
		downs: number;
		mod_reports: any;
		secure_media_embed: any;
		saved: any;
		removal_reason: any;
		is_self: any;
		name: any;
		permalink: any;
		stickied: any;
		created: number;
		url: string;
		author_flair_text: any;
		title: string;
		created_utc: number;
		ups: number;
		num_comments: number;
		visited: any;
		num_reports: any;
		distinguished: any;
	}	
}	