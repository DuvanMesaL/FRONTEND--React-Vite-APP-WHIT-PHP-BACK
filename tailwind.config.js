import lineClamp from '@tailwindcss/line-clamp';

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          colors: {
            'primary-bg': 'rgba(7, 193, 149, 0.08)',
          },
        },
      },
    plugins: [lineClamp],
};
