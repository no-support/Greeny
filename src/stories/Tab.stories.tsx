import type { Meta, StoryObj } from '@storybook/react';
import Tab from '@components/tab/Tab';
import { faker } from '@faker-js/faker/locale/ko';
import PlantThumbnail from '@/app/(greeny)/profile/PlantThumbnail';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = Array.from({ length: 10 }, (_, i) => ({
  href: faker.internet.url(),
  src: faker.image.url(),
}));

const FirstContent = () => {
  return (
    <>
      <ul>
        {mockData.map(({ href, src }, i) => (
          <PlantThumbnail key={i} href={href} src={src} />
        ))}
      </ul>
      <style jsx>{`
        ul {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.2rem;
          transition: all 0.3s;

          @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </>
  );
};
export const Basic: Story = {
  args: {
    firstSrOnly: 'a11y-First tab',
    secondSrOnly: 'a11y-Second tab',
    firstContent: <FirstContent />,
    secondContent: <div>{faker.lorem.sentence()}</div>,
  },
};
