/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_2.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/03 16:55:19 by blaine            #+#    #+#             */
/*   Updated: 2020/06/17 21:48:44 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_sort_nn(t_dir **args)
{
	t_dir	*current;
	t_dir	*next;
	int		sorted;

	sorted = 0;
	current = (*args);
	while (current->next)
	{
		next = current->next;
		if (ft_is_file(current->path) && ft_is_file(next->path))
			ft_sort_1(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_file(next->path))
			ft_sort_1(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_dir(next->path))
			ft_sort_1(&current, &next, &sorted);
		if (sorted == 1 && !(sorted = 0))
			current = (*args);
		else
			current = current->next;
	}
}

void	ft_sort_nr(t_dir **args)
{
	t_dir	*current;
	t_dir	*next;
	int		sorted;

	sorted = 0;
	current = (*args);
	while (current->next)
	{
		next = current->next;
		if (ft_is_file(current->path) && ft_is_file(next->path))
			ft_sort_2(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_file(next->path))
			ft_sort_2(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_dir(next->path))
			ft_sort_2(&current, &next, &sorted);
		if (sorted == 1 && !(sorted = 0))
			current = (*args);
		else
			current = current->next;
	}
}

void	ft_sort_tn(t_dir **args)
{
	t_dir	*current;
	t_dir	*next;
	int		sorted;

	sorted = 0;
	current = (*args);
	while (current->next)
	{
		next = current->next;
		if (ft_is_file(current->path) && ft_is_file(next->path))
			ft_sort_3(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_file(next->path))
			ft_sort_3(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_dir(next->path))
			ft_sort_3(&current, &next, &sorted);
		if (sorted == 1 && !(sorted = 0))
			current = (*args);
		else
			current = current->next;
	}
}

void	ft_sort_tr(t_dir **args)
{
	t_dir	*current;
	t_dir	*next;
	int		sorted;

	sorted = 0;
	current = (*args);
	while (current->next)
	{
		next = current->next;
		if (ft_is_file(current->path) && ft_is_file(next->path))
			ft_sort_4(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_file(next->path))
			ft_sort_4(&current, &next, &sorted);
		else if (ft_is_dir(current->path) && ft_is_dir(next->path))
			ft_sort_4(&current, &next, &sorted);
		if (sorted == 1 && !(sorted = 0))
			current = (*args);
		else
			current = current->next;
	}
}

void	ft_sort_a(t_dir **args, t_opt *opt)
{
	if ((*args)->next)
	{
		if (!(opt->t))
		{
			if (!(opt->r))
				ft_sort_nn(args);
			else
				ft_sort_nr(args);
		}
		else
		{
			if (!(opt->r))
				ft_sort_tn(args);
			else
				ft_sort_tr(args);
		}
	}
}
