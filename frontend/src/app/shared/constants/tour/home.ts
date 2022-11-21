import {GuidedTour, Orientation} from "ngx-guided-tour";

export const homeTour: GuidedTour = {
  tourId: 'purchases-tour',
  steps: [
    {
      title: 'Welcome to Diaryist!',
      content: 'This is a diary app for creating and analyzing entries.',
    },
    {
      title: 'Add new entry',
      selector: '#tour-create-entry-btn',
      content: 'Click on the button to create a new entry.',
      orientation: Orientation.Bottom
    },
    {
      title: 'Entry list',
      selector: '#tour-entry-list',
      content: 'All your entries are here.',
      orientation: Orientation.Left
    },
    {
      title: 'User info',
      selector: '#tour-sidebar-general',
      content: 'General information is displayed here, you can also change the name and avatar.',
      orientation: Orientation.Right
    },
    {
      title: 'Calendar',
      selector: '#tour-sidebar-calendar',
      content: 'Select a date range to search.',
      orientation: Orientation.Right
    },
    {
      title: 'Categories',
      selector: '#tour-sidebar-categories',
      content: 'Also you can select categories to search.',
      orientation: Orientation.Right
    },
    {
      title: 'More filters',
      selector: '#tour-sidebar',
      content: 'In addition, there is a filter by tags and mood.',
      orientation: Orientation.Right
    },
  ]
};
