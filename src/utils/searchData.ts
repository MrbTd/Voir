export const searchData = (search: string, data: any, entity: string) => {
  return search.length === 0
    ? data
    : data.filter((val: any) =>
        val[`${entity}`]
          .toString()
          .toUpperCase()
          .includes(search.toString().toUpperCase()),
      );
};

export const searchDataCommande = (
  search: string,
  data: any[],
  entity: string,
) => {
  return search.length === 0
    ? data
    : data.map(val =>
        val?.items.filter((value: any) =>
          value[`${entity}`]
            .toString()
            .toUpperCase()
            .includes(search.toString().toUpperCase()),
        ),
      );
};
