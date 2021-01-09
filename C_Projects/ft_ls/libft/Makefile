# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: blaine <blaine@student.hive.fi>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/10/16 15:46:27 by blaine            #+#    #+#              #
#    Updated: 2020/03/25 02:35:26 by blaine           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = libft.a

SRC =	src/ft_printf.c \
		src/ft_printf_help1.c \
		src/ft_printf_help2.c \
		src/ft_printf_print1.c \
		src/ft_printf_print2.c \
		src/ft_printf_width1.c \
		src/ft_printf_width2.c \
		src/ft_printf_width3.c \
		src/ft_printf_width4.c \
		src/ft_printf_flags1.c \
		src/ft_printf_flags2.c \
		src/ft_strnjoin.c src/get_next_line.c src/ft_destroy_factory.c \
		src/ft_strclr.c src/ft_strdel.c src/ft_strnew.c src/ft_strlen.c \
		src/ft_memchr.c src/ft_memcmp.c src/ft_memset.c src/ft_memmove.c \
		src/ft_isprint.c src/ft_toupper.c src/ft_tolower.c src/ft_itoa.c \
		src/ft_strlcat.c src/ft_strchr.c src/ft_strrchr.c src/ft_strcpy.c \
		src/ft_strmapi.c src/ft_strequ.c src/ft_strnequ.c src/ft_strcmp.c \
		src/ft_strncmp.c src/ft_strdup.c src/ft_strstr.c src/ft_strnstr.c \
		src/ft_lstnew.c src/ft_isupper.c src/ft_islower.c src/ft_strclen.c \
		src/ft_memcpy.c src/ft_memccpy.c src/ft_putnbr.c src/ft_putnbr_fd.c \
		src/ft_isalnum.c src/ft_isalpha.c src/ft_isascii.c src/ft_isdigit.c \
		src/ft_strncpy.c src/ft_striter.c src/ft_striteri.c src/ft_strmap.c \
		src/ft_lstdel.c src/ft_lstdelone.c src/ft_lstiter.c src/ft_lstmap.c \
		src/ft_atoi.c src/ft_memdel.c src/ft_memalloc.c src/ft_putendl_fd.c \
		src/ft_putstr.c src/ft_putstr_fd.c src/ft_strcat.c src/ft_strncat.c \
		src/ft_strtrim.c src/ft_strsplit.c src/ft_strjoin.c src/ft_strsub.c \
		src/ft_putchar.c src/ft_putchar_fd.c src/ft_putendl.c src/ft_bzero.c \
		src/ft_isspace.c src/ft_strndup.c src/ft_lstaddend.c src/ft_lstadd.c \
		src/ft_sqrt.c src/ft_itoa_base.c src/ft_charmequ.c src/ft_strcclen.c \
		src/ft_over.c
OBJ =	$(subst .c,.o,$(SRC))
FLG =	-Wall -Wextra
INC =	includes

all: $(NAME)

$(NAME):
	@gcc $(FLG) -I$(INC) -c $(SRC)
	@mv *.o src/
	@ar rc $(NAME) $(OBJ)
	@ranlib $(NAME)

clean:
	@-rm -f $(OBJ)

fclean: clean
	@-rm -f $(NAME)

re: fclean all
	@-rm -f $(OBJ)

test:
	@echo "Creating Library"
	@make re
	@echo "Compiling"
	@gcc -Wall -Werror -Wextra -I includes/ main.c libft.a
	@echo "Running"
	@./a.out

.PHONY: clean fclean re run all