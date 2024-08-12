import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://flashcard-backend-ivory.vercel.app',
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // },
  plugins: [react()],
})

// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig(({ mode }) => {
//   // Load environment variables based on the current mode ('development', 'production', etc.)
//   const env = loadEnv(mode, process.cwd());

//   return {
//     server: {
//       proxy: {
//         '/api': {
//           target: env.VITE_API_BASE_URL,
//           changeOrigin: true,
//           secure: false, 
//         }
//       }
//     },
//     plugins: [react()],
//   };
// });
