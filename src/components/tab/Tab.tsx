import * as Tabs from '@radix-ui/react-tabs';
import styles from './Tab.module.scss';
import React from 'react';

interface TabProps {
  firstSrOnly: string;
  secondSrOnly: string;
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
}

export default function Tab({ firstSrOnly, secondSrOnly, firstContent, secondContent }: TabProps) {
  return (
    <Tabs.Root className={styles.Root} defaultValue="tab1">
      <Tabs.List className={styles.List} aria-label="탭 목록">
        <Tabs.Trigger className={styles.Trigger} value="tab1">
          <span className="hidden">{firstSrOnly}</span>
          <MyPlantIcon />
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.Trigger} value="tab2">
          <span className="hidden">{secondSrOnly}</span>
          <MyPostIcon />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={styles.Content} value="tab1">
        {firstContent}
      </Tabs.Content>
      <Tabs.Content className={styles.Content} value="tab2">
        {secondContent}
      </Tabs.Content>
    </Tabs.Root>
  );
}

function MyPlantIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.39023 0.330719C9.29534 0.212111 9.15168 0.143066 8.99979 0.143066C8.8479 0.143066 8.70424 0.212111 8.60936 0.330719L6.56826 2.88209L5.60017 0.685787C5.53825 0.545291 5.4152 0.441037 5.26644 0.403022C5.11768 0.365008 4.9597 0.397449 4.83796 0.491011C4.17436 1.00102 3.63745 1.65735 3.26906 2.40886C2.90205 3.15756 2.71217 3.9806 2.71405 4.81433C2.67055 6.17924 3.16915 7.50604 4.1011 8.50456C4.32171 8.74092 4.56233 8.95432 4.81924 9.14307H3.21412C3.0673 9.14307 2.92791 9.20759 2.83291 9.31952C2.73791 9.43145 2.6969 9.57948 2.72076 9.72434L3.81352 16.358C3.88211 16.7803 4.10001 17.1639 4.42758 17.4391C4.75444 17.7136 5.16882 17.862 5.59559 17.8574H12.3912C12.818 17.862 13.2324 17.7136 13.5592 17.4391C13.8867 17.164 14.1045 16.7806 14.1732 16.3586L14.1734 16.3573L15.2787 9.72527C15.3029 9.58029 15.2621 9.43202 15.1671 9.31988C15.0721 9.20773 14.9325 9.14307 14.7855 9.14307H13.1803C13.4372 8.95432 13.6778 8.74092 13.8984 8.50456C14.8304 7.50604 15.329 6.17925 15.2855 4.81433C15.2874 3.9806 15.0975 3.15756 14.7305 2.40886C14.3621 1.65735 13.8252 1.00102 13.1616 0.491011C13.0398 0.397449 12.8819 0.365008 12.7331 0.403022C12.5844 0.441037 12.4613 0.545291 12.3994 0.685787L11.4313 2.88207L9.39023 0.330719ZM11.9507 4.18309C12.0164 4.10673 12.0558 4.01401 12.0675 3.91797L13.0376 1.71711C13.3592 2.04958 13.6278 2.43128 13.8326 2.84902C14.1332 3.46231 14.2882 4.13673 14.2855 4.81975C14.2855 4.82603 14.2855 4.8323 14.2858 4.83858C14.3229 5.94202 13.9207 7.01511 13.1674 7.82224C12.4166 8.62662 11.3783 9.10132 10.2791 9.14307H10.2605C10.0996 9.14185 9.93902 9.13003 9.77998 9.10777L11.9507 4.18309ZM10.9764 3.91418L8.99979 1.44346L7.02319 3.9142L8.99978 8.39849L10.9764 3.91418ZM5.93206 3.91807C5.9438 4.01405 5.98321 4.1067 6.04885 4.18302L8.21958 9.10777C8.06053 9.13003 7.9 9.14185 7.73901 9.14307H7.72041C6.62121 9.10132 5.58291 8.62662 4.83216 7.82224C4.07884 7.01511 3.67661 5.94202 3.71379 4.83858C3.714 4.8323 3.7141 4.82603 3.71407 4.81975C3.71135 4.13674 3.86634 3.46231 4.16698 2.84902C4.37175 2.43128 4.64033 2.04958 4.96193 1.71711L5.93206 3.91807ZM10.2851 10.1432L10.2569 10.1431H7.74264L7.71441 10.1432L7.70389 10.1431H3.80322L4.80054 16.1974C4.83066 16.3833 4.92656 16.5522 5.07077 16.6734C5.21499 16.7945 5.39792 16.8598 5.58625 16.8574L5.59269 16.8573L12.4006 16.8574C12.5889 16.8598 12.7718 16.7945 12.916 16.6734C13.0602 16.5522 13.1561 16.3833 13.1863 16.1974L13.1866 16.1952L14.1953 10.1431H10.2957L10.2851 10.1432Z"
        fill="#20604F"
      />
    </svg>
  );
}

function MyPostIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.4839 9.00008C4.4839 8.75066 4.6861 8.54846 4.93552 8.54846H13.0645C13.314 8.54846 13.5162 8.75066 13.5162 9.00008C13.5162 9.2495 13.314 9.45169 13.0645 9.45169H4.93552C4.6861 9.45169 4.4839 9.2495 4.4839 9.00008Z"
        fill="#20604F"
      />
      <path
        d="M4.93552 12.0324C4.6861 12.0324 4.4839 12.2346 4.4839 12.484C4.4839 12.7334 4.6861 12.9356 4.93552 12.9356H9.58068C9.8301 12.9356 10.0323 12.7334 10.0323 12.484C10.0323 12.2346 9.8301 12.0324 9.58068 12.0324H4.93552Z"
        fill="#20604F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.96774 1.45162C5.96774 1.2022 5.76555 1 5.51613 1C5.26671 1 5.06452 1.2022 5.06452 1.45162V2.74185H2.6129C1.72212 2.74185 1 3.46398 1 4.35476V15.3871C1 16.2779 1.72212 17 2.6129 17H15.3871C16.2779 17 17 16.2779 17 15.3871V4.35476C17 3.46398 16.2779 2.74185 15.3871 2.74185H12.9354V1.45162C12.9354 1.2022 12.7332 1 12.4838 1C12.2344 1 12.0322 1.2022 12.0322 1.45162V2.74185H9.45164V1.45162C9.45164 1.2022 9.24945 1 9.00003 1C8.75061 1 8.54842 1.2022 8.54842 1.45162V2.74185H5.96774V1.45162ZM5.06452 3.64508V4.93551C5.06452 5.18493 5.26671 5.38712 5.51613 5.38712C5.76555 5.38712 5.96774 5.18493 5.96774 4.93551V3.64508H8.54842V4.93551C8.54842 5.18493 8.75061 5.38712 9.00003 5.38712C9.24945 5.38712 9.45164 5.18493 9.45164 4.93551V3.64508H12.0322V4.93551C12.0322 5.18493 12.2344 5.38712 12.4838 5.38712C12.7332 5.38712 12.9354 5.18493 12.9354 4.93551V3.64508H15.3871C15.779 3.64508 16.0968 3.96282 16.0968 4.35476V15.3871C16.0968 15.779 15.779 16.0968 15.3871 16.0968H2.6129C2.22096 16.0968 1.90323 15.779 1.90323 15.3871V4.35476C1.90323 3.96282 2.22096 3.64508 2.6129 3.64508H5.06452Z"
        fill="#20604F"
      />
    </svg>
  );
}
