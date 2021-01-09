/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tdawson <tdawson@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/18 18:28:54 by blaine            #+#    #+#             */
/*   Updated: 2019/11/19 19:56:09 by tdawson          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

void		ft_error(int n)
{
	if (n == 10)
		ft_putstr("usage: ./fillit source_file\n");
	else
		ft_putendl("error");
	exit(0);
}

int			main(int argc, char **argv)
{
	t_tetris	**blocks;
	char		*board;
	int			fd;
	int			count;

	blocks = NULL;
	board = NULL;
	if (argc != 2)
		ft_error(10);
	if (argc == 2)
	{
		if ((fd = open(argv[1], O_RDONLY)) < 0)
			ft_error(7);
		count = read_blocks(fd, &blocks);
		board_play(board, blocks, count);
		if (close(fd) < 0)
			ft_error(7);
	}
	return (0);
}
