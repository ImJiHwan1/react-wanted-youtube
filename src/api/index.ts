import { loadContentInfo } from '@interfaces/ContentInfo';
import axios from 'axios';
import { isEmpty } from 'lodash'

export const getYouTubeData = async ({ q, maxResults }: { q: string, maxResults: number }): Promise<any> => {
	const params = {
		key: `${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`,
    part: 'snippet',
    q: q,
    type: 'video',
    maxResults: maxResults
	}
	const response = await axios.get(`${process.env.NEXT_PUBLIC_YOUTUBE_URL}/youtube/v3/search`, {
		params: params,
		timeout: 5000,
	});

	if (response.status === 200 && !isEmpty(response.data)) {
		return loadContentInfo(response.data);
	} else {
		return undefined;
	}
};

