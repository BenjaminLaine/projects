# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: blaine <blaine@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/10/15 14:36:23 by blaine            #+#    #+#              #
#    Updated: 2019/10/15 14:43:24 by blaine           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = libft.a

CFILES = ./srcs/ft_putchar.c ./srcs/ft_swap.c ./srcs/ft_putstr.c ./srcs/ft_strcmp.c ./srcs/ft_strlen.c
HFILES = -I includes/

all: $(NAME)

$(NAME):
	gcc -Wall -Werror -Wextra -c $(CFILES) $(HFILES)
	ar rc $(NAME) ft_putchar.o ft_swap.o ft_putstr.o ft_strcmp.o ft_strlen.o
	ranlib $(NAME)

clean:
	-rm -f ft_putchar.o ft_swap.o ft_putstr.o ft_strcmp.o ft_strlen.o

fclean: clean
	-rm -f $(NAME)

re: fclean all
