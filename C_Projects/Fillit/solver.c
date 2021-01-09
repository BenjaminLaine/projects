/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   solver.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tdawson <tdawson@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/18 18:24:57 by blaine            #+#    #+#             */
/*   Updated: 2019/11/18 19:48:44 by tdawson          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

int			check_board(char *board, t_tetris *blocks, int w)
{
	int start;
	int i;

	i = 0;
	start = (blocks->y * (w + 1) + blocks->x);
	if (board[start] != '.' || start > (w * (w + 1)))
		return (0);
	while (i < 3)
	{
		(blocks->block[i] != 1) ? (start += blocks->block[i] + w - 4) :
		(start += blocks->block[i]);
		if (board[start] != '.' || start > (w * (w + 1)))
			return (0);
		i++;
	}
	return (1);
}

void		block_on_board(char **board, t_tetris *b, int w, char c)
{
	int start;
	int i;

	i = 0;
	start = (b->y * (w + 1) + b->x);
	(*board)[start] = c;
	while (i < 3)
	{
		(b->block[i] != 1) ? (start += b->block[i] + w - 4) :
		(start += b->block[i]);
		(*board)[start] = c;
		i++;
	}
}

int			move_block(char *board, t_tetris **block)
{
	if (board[(*block)->x] == '\n')
	{
		if (board[(*block)->x * (*block)->y + (*block)->x + 1] == '\0')
		{
			(*block)->x = 0;
			(*block)->y = 0;
			return (0);
		}
		(*block)->x = 0;
		(*block)->y += 1;
	}
	else
		(*block)->x += 1;
	return (1);
}

int			place_block(char *board, t_tetris **blocks, int w)
{
	t_tetris	*tmp;

	if (*blocks == NULL)
		return (1);
	tmp = *blocks;
	if (!(check_board(board, *blocks, w)))
	{
		if (!(move_block(board, &tmp)))
			return (0);
		return (place_block(board, blocks, w));
	}
	block_on_board(&board, tmp, w, tmp->c);
	if (!(place_block(board, blocks + 1, w)))
	{
		block_on_board(&board, tmp, w, '.');
		tmp->x += 1;
		return (place_block(board, blocks, w));
	}
	else
		return (1);
	return (place_block(board, blocks + 1, w));
}

void		board_play(char *board, t_tetris **blocks, int count)
{
	int start_width;
	int ret;

	start_width = calc_start_size(count);
	board = create_board(start_width);
	ret = place_block(board, blocks, start_width);
	if (ret == 0)
		board_play(board, blocks, count + 1);
	if (ret == 1)
		ft_putstr(board);
}
