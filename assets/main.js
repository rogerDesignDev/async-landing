const API_CHANNEL = 'https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=UCyhvA2gp52rOGXoUZBxcCNw';
const API_VIDEOS = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCyhvA2gp52rOGXoUZBxcCNw&part=snippet%2Cid&order=date&maxResults=9';

const logo = null || document.getElementById('logo');
const description = null || document.getElementById('description');
const banner = null || document.getElementById('banner');
const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7d7af5b2a6msh33f85e11784443bp10b855jsnd9a290b98a0c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const channel = await fetchData(API_CHANNEL);
    const videos = await fetchData(API_VIDEOS);

    console.log(channel.items);
    console.log(videos.items);

    let viewChannelLogo = `
      ${channel.items.map( video => `
        <a href="https://www.youtube.com/channel/UCyhvA2gp52rOGXoUZBxcCNw">
          <span class="sr-only">${video.brandingSettings.channel.title}</span>
          <img class="h-8 w-auto sm:h-10" src="${video.snippet.thumbnails.high.url}" alt="${video.brandingSettings.channel.title}">
        </a>
      `).slice(0,8).join('')}
    `;

    let viewChannelDescription = `
      ${channel.items.map( video => `
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block text-red-600 xl:inline">${video.brandingSettings.channel.title}</span>
        </h1>

        <p class="mt-3 text-base text-gray-500 dark:text-white sm:mt-3 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-3 md:text-xl lg:mx-0">
          ${video.statistics.subscriberCount} suscriptores
        </p>

        <p class="mt-3 text-base text-gray-500 dark:text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          ${video.snippet.description}
        </p>

        <div class="pt-8 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
          <a href="https://www.youtube.com/channel/UCyhvA2gp52rOGXoUZBxcCNw?sub_confirmation=1" class="bg-red-800 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">
            Suscribirme
          </a>
        </div>
      `).slice(0,8).join('')}
    `;

    let viewChannelBanner = `
      ${channel.items.map( video => `
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="${video.brandingSettings.image.bannerExternalUrl}" alt="${video.brandingSettings.channel.title}">
      `).slice(0,8).join('')}
    `;

    let view = `
      ${videos.items.map( video => `
        <div class="group relative">
          <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <a class="w-full" href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </a>
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700 dark:text-slate-400">
              ${video.snippet.title}
            </h3>
          </div>
        </div>
      `).slice(0,8).join('')}
    `;


    logo.innerHTML = viewChannelLogo;
    description.innerHTML = viewChannelDescription;
    banner.innerHTML = viewChannelBanner;

    content.innerHTML = view;

  } catch (error) {
    console.log(error);
  }
})();