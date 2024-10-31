import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  PaginationControlProps,
  PaginationProps,
} from "@/features/pagination/types/pagination";
import { useMemo } from "react";

export interface PageNavigationProps {
  controls: PaginationControlProps;
  pagination: PaginationProps;
}

export default function PageNavigation({
  controls,
  pagination,
}: PageNavigationProps) {
  const { currentPage, totalPages } = pagination;
  const { goToPage } = controls;

  // Tạo mảng số trang cần hiển thị
  const pageNumbers = useMemo(() => {
    const delta = 0; // Số trang hiển thị bên trái và phải của trang hiện tại
    const range: number[] = [];
    const rangeWithDots: (number | "dots")[] = [];

    // Luôn hiển thị trang 1
    range.push(1);

    // Tính toán range của các trang cần hiển thị
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Luôn hiển thị trang cuối cùng
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Thêm dấu ... vào các khoảng trống
    let prev: number | null = null;
    for (const i of range) {
      if (prev !== null) {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1);
        } else if (i - prev !== 1) {
          rangeWithDots.push("dots");
        }
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);

  // Xử lý chuyển trang
  const handlePageClick = (page: number) => {
    goToPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // if (totalPages <= 1) return null;

  return (
    <Pagination className="mx-0 w-fit ">
      <PaginationContent className="flex flex-0">
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
            className={
              currentPage <= 1
                ? "pointer-events-none text-muted-foreground/40"
                : ""
            }
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "dots" ? (
            <PaginationItem key={`dots-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(pageNumber);
                }}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
