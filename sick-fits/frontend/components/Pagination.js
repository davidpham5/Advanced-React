import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
import Head from 'next/head';
import Link from 'next/link';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`
const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading ... </p>

      const { count } = data.itemsConnection.aggregate;
      const pages = Math.ceil(count / perPage);
      const page = parseFloat(props.page);

      return (
        <PaginationStyles>
          <Head>
            <title>Pham 5 | { page } of { pages }</title>
          </Head>
          <Link prefetch href={{ pathName: 'items', query: { page: page - 1} }}>
            <a aria-disabled={page <= 1}>◀️ Prev</a>
          </Link>
          <p>Page { page } of { pages }</p>
          <p>{count} Items Total</p>
          <Link href={{ pathName: 'items', query: { page: page + 1} }}>
            <a aria-disabled={page >= pages}>▶️ Next</a>
          </Link>
        </PaginationStyles>
        )
      }}
    </Query>
)

export default Pagination;