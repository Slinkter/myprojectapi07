import Pagination from '../components/common/Pagination';

export default {
  component: Pagination,
  title: 'Common/Pagination',
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
  },
};

export const FirstPage = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const MiddlePage = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const LastPage = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const FewPages = {
  args: {
    currentPage: 1,
    totalPages: 3,
    onPageChange: () => {},
  },
};