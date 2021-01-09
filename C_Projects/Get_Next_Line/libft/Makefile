# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: blaine <blaine@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/10/16 15:46:27 by blaine            #+#    #+#              #
#    Updated: 2019/11/05 23:14:05 by blaine           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = libft.a

CFILES = 	ft_isalnum.c ft_isalpha.c ft_isascii.c ft_isdigit.c ft_isprint.c \
			ft_toupper.c ft_tolower.c ft_itoa.c ft_atoi.c ft_memdel.c \
			ft_memalloc.c ft_bzero.c ft_memchr.c ft_memcmp.c ft_memset.c \
			ft_memmove.c ft_memcpy.c ft_memccpy.c ft_putnbr.c ft_putnbr_fd.c \
			ft_putchar.c ft_putchar_fd.c ft_putendl.c ft_putendl_fd.c \
			ft_putstr.c ft_putstr_fd.c ft_strcat.c ft_strncat.c ft_strlcat.c \
			ft_strchr.c ft_strrchr.c ft_strcpy.c ft_strncpy.c ft_striter.c \
			ft_striteri.c ft_strmap.c ft_strmapi.c ft_strequ.c ft_strnequ.c \
			ft_strcmp.c ft_strncmp.c ft_strdup.c ft_strstr.c ft_strnstr.c \
			ft_strclr.c ft_strdel.c ft_strnew.c ft_strlen.c ft_strtrim.c \
			ft_strsplit.c ft_strjoin.c ft_strsub.c ft_isspace.c ft_strndup.c \
			ft_lstaddend.c ft_lstadd.c ft_lstdel.c ft_lstdelone.c \
			ft_lstiter.c ft_lstmap.c ft_lstnew.c ft_isupper.c ft_islower.c \
			ft_strclen.c ft_strnjoin.c
OFILES = $(subst .c,.o,$(CFILES))
FLAGS = -Wall -Werror -Wextra
INCLUDE =./includes

all: $(NAME)

$(NAME):
	@gcc $(FLAGS) -I$(INCLUDE) -c $(CFILES)
	@ar rc $(NAME) $(OFILES)
	@ranlib $(NAME)

clean:
	@-rm -f $(OFILES)

fclean: clean
	@-rm -f $(NAME)

re: fclean all

file:
	@-rm -f a.out
	@gcc $(FLAGS) $(file) 
	@./a.out

lib:
	@-rm -f a.out
	@gcc $(FLAGS) $(file) -L. -lft
	@./a.out

.PHONY: clean fclean re file lib all