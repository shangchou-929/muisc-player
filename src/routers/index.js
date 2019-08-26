import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/music',
            keepAlive: true,
            component: () => import('@/views/Music'),
            children: [
                {
                    path: 'recommend',
                    component: () => import("@/components/Recommend")
                },
                {
                    path: 'hotplaying',
                    component: () => import("@/components/HotPlaying")
                },
                {
                    path: 'search',
                    component: () => import('@/components/Search')
                },
                {
                    path:'search/:keyword',
                    component: () => import('@/components/SearchResult'),
                    props: {
                        result: true
                    }
                },
                {
                    path: 'sheetdetail/:sheetId',
                    component:() => import('@/views/SheetDetail'),
                    props: {
                        sheetdetail: true
                    }
                },
                {
                    path:'songdetail/:songId',
                    component: () => import('@/views/SongDetail'),
                    props: {
                        songdetail: true
                    }
                },
                {
                    path: 'albumdetail/:albumId',
                    component: () => import("@/views/AlbumDetail"),
                    props: {
                        albumdetail: true
                    }
                },
                {
                    path: 'singerdetail/:singerId',
                    component: () => import("@/views/SingerDetail"),
                    props: {
                        singerdetail: true
                    }
                }
            ]
        },
        {
            path: '/*',
            redirect: '/music/recommend'
        },
        
    ]
})